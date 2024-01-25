import { useEffect, useState } from "react";
import "../media/SelectionPageNew.css";
import LevelContent from "../components/LevelContentComponent";
import DataBaseService from "../firebase/database";
import { LoginButton, SideLevelButton } from "../elements/Buttons";
import LoginModal from "../modals/LoginModal";
import { useUser } from "../elements/UserProvider";
import { KanjiLevelProgress } from "../utility/types";
import OverviewPanel from "../components/OverviewPanelComponent";
import { useLocation } from "react-router-dom";
import { calculateLevelProgress, translateToNumbers } from "../utility/utility";
import SearchComponent from "../components/SearchComponent";

function SelectionPage() {
  const totalLevelCount = 60;

  const [levelClicked, setLevelClicked] = useState(1);
  const [userLevelProgress, setUserProgress] = useState<(KanjiLevelProgress | null)[]>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const location = useLocation();

  const { userId, logout } = useUser();

  useEffect(() => {
    if (!userId) {
      setUserProgress([]);
      return;
    }
    const fetchUserData = async () => {
      try {
        const ulpPromises = [];
        for (let i = 1; i <= totalLevelCount; i++) {
          ulpPromises.push(await DataBaseService.getUserLevelProgress(userId, i));
        }
        const ulp = await Promise.all(ulpPromises);
        setUserProgress(ulp);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId, location.pathname]);

  function handleLevelClicked(level: number) {
    setLevelClicked(level);
  }

  const renderLevels = () => {
    // const levels: JSX.Element[] = [];

    // for (let i = 1; i <= totalLevelCount; i++) {
    //   levels.push(
    //     <>
    //       <SideLevelButton
    //         level={i}
    //         progress={calculateLevelProgress(userLevelProgress[i - 1])}
    //         onClick={() => handleLevelClicked(i)}
    //         clicked={levelClicked === i}
    //       />
    //     </>
    //   );
    // }

    const results =
      translateToNumbers(searchInput) ??
      Array.from({ length: totalLevelCount }, (_, i) => i + 1);
    console.log(
      "results",
      results
    );
    const levels = results.map((i) => (
      <SideLevelButton
        key={i}
        level={i}
        progress={calculateLevelProgress(userLevelProgress[i - 1])}
        onClick={() => handleLevelClicked(i)}
        clicked={levelClicked === i}
      />
    ));

    return levels;
  } 

  const handleLoginAndOut = () => {
    if(userId){
      logout();
    }else {
      setIsLoginOpen(true);
    }
  }

  function handleSearchChange(input: string) {
    setSearchInput(input);
  }

  return (
    <div className="selection-page-new">
      <div className="side-panel">
        <LoginButton onClick={handleLoginAndOut}>
          {userId ? "Logout" : "Login"}
        </LoginButton>
        <SearchComponent onChange={(input) => handleSearchChange(input)}/>
        <div className="level-selection">
          {renderLevels()}
        </div>
      </div>
      <div className="main-panels">
        <div className="overview-panel">
          <OverviewPanel userLevelProgress={userLevelProgress} onLevelClick={(level) => setLevelClicked(level)}/>
        </div>
        <div className="level-panel">
          <LevelContent level={levelClicked} userLevelProgress={userLevelProgress[levelClicked - 1]} />
        </div>
      </div>
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false) } />
    </div>
  );
}

export default SelectionPage;

