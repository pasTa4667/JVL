import { useEffect, useState } from "react";
import "../media/SelectionPageNew.css";
import LevelContent from "../components/LevelContentComponent";
import DataBaseService from "../firebase/database";
import { LoginButton, SideLevelButton } from "../elements/Buttons";
import LoginModal from "../modals/LoginModal";
import { useUser } from "../elements/UserProvider";
import { KanjiLevelProgress } from "../utility/types";

function SelectionPage() {
  const totalLevelCount = 60;

  const [levelClicked, setLevelClicked] = useState(1);
  const [userLevelProgress, setUserProgress] = useState<(KanjiLevelProgress | null)[]>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { userId, logout } = useUser();

  useEffect(() => {
    if (!userId) return;
    const fetchUserData = async () => {
      try {
        for(let i = 1; i <= totalLevelCount; i++) {
          userLevelProgress.push(await DataBaseService.getUserLevelProgress(
            userId,
            i
          ));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
    //maybe later on
    // const intervalId = setInterval(fetchUserData, 5000);
    // return () => clearInterval(intervalId);
  }, [userId]);

  function handleLevelClicked(level: number) {
    setLevelClicked(level);
  }

  const renderLevels = () => {
    const levels: JSX.Element[] = [];

    for (let i = 1; i <= totalLevelCount; i++) {
      levels.push(
        <>
          <SideLevelButton
            level={i}
            progress={30}
            onClick={() => handleLevelClicked(i)}
            clicked={levelClicked === i}
          />
        </>
      );
    }

    return levels;
  } 

  const handleLoginAndOut = () => {
    if(userId){
      logout();
    }else {
      setIsLoginOpen(true);
    }
  }

  return (
    <div className="selection-page-new">
      <div className="side-panel">
        <LoginButton onClick={handleLoginAndOut}>
          {userId ? "Logout" : "Login"}
        </LoginButton>
        <div className="level-selection">
          {renderLevels()}
        </div>
      </div>
      <div className="main-panels">
        <div className="overview-panel"></div>
        <div className="level-panel">
            <LevelContent level={levelClicked} userLevelProgress={userLevelProgress[levelClicked]}/>
        </div>
      </div>
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false) } />
    </div>
  );
}

export default SelectionPage;

