import { useState } from "react";
import "../media/SelectionPage.css";
import LevelContent from "../components/LevelContentComponent";
import { CustomToggleButton } from "../elements/ToggleButton";
import LoginModal from "../modals/LoginModal";
import { useUser } from "../elements/UserProvider";

function SelectionPage() {
  const totalLevelCount = 60;
  const groupCount = 10;
  const levelPerGroup = totalLevelCount / groupCount;

  const [levelClicked, setLevelClicked] = useState(new Array(totalLevelCount / groupCount).fill(false));
  const [groupClicked, setGroupClicked] = useState(0);
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { userId, login, logout } = useUser();

  function handleLevelClicked(index: number) {
    const newGroupClicked = [...levelClicked];
    newGroupClicked[index] = !newGroupClicked[index];
    setLevelClicked(newGroupClicked);
  }

  function handleGroupClicked(index: number) {
    setGroupClicked(index);
  }

  const renderLevels = (group: number) => {
    const levels: JSX.Element[] = [];

    for (let i = (levelPerGroup * group); i < levelPerGroup * (group + 1); i++) {
        levels.push(
          <>
            <button
              key={i}
              className="level-group-button"
              onClick={() => handleLevelClicked(i)}
            >
              Level {i + 1}
            </button>
            {levelClicked[i] ? <LevelContent key={i + 1} level={i + 1}/> : <div></div>}
          </>
        );
    }

    return levels;
  }

  const renderGroups = () => {
    const groups = [];

    for (let i = 0; i < groupCount; i++) {
      groups.push(
        <CustomToggleButton 
          key={i} 
          className="group-toggle-button" 
          value={i}
          selected={groupClicked === i ? true : false}
          onClick={() => handleGroupClicked(i)}>
          {i + 1}
        </CustomToggleButton>       
      );
    }

    return groups;
  }

  const handleLoginAndOut = () => {
    console.log(userId);
    if(userId){
      logout();
    }else {
      setIsLoginOpen(true);
    }
  }

  return (
    <div className="selection-page">
      <div className="selection-page-header">
        <div className="title">JVL</div>
        <button className="login-button" onClick={handleLoginAndOut}>
          {userId ? "Logout" : "Login"}
        </button>
      </div>
      <div className="groups-container">{renderGroups()}</div>
      {renderLevels(groupClicked)}
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false) } />
    </div>
  );
}

export default SelectionPage;

