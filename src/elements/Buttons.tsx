import { Button, ToggleButton, ToggleButtonProps, styled, toggleButtonClasses, buttonClasses, ButtonProps } from "@mui/material";
import { LevelProgressBar } from "./ProgressBar";

//ToggleButton
const SquareToggleButton = styled(ToggleButton)(({ theme }) => ({
  height: 40,
  width: 40,
  borderRadius: 5,
  borderStyle: "solid",
  borderWidth: 1,
  fontSize: 16,
  backgroundColor: "aquamarine",
  fontWeight: "bold",
  color: "#1e523d",
  "&:hover": {
    backgroundColor: "lightblue",
  },
  [`&.${toggleButtonClasses.selected}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    color: "aquamarine",
    "&:hover": {
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  },
}));

export function CustomToggleButton(props: ToggleButtonProps) {
    return <SquareToggleButton {...props}/>
}

//Standart Button Style (should be used for every button)
const StandartButtonStyled = styled(Button)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderStyle: "none",
  borderRadius: 15,
  boxShadow: "0 5px 8px rgba(0, 0, 0, 0.2)",
  fontFamily: "sans-serif",
  textTransform: "none",
  [`&.${buttonClasses.colorInherit}`]: {
    color: "#1e523d",
    backgroundColor: "indianred",
  },
  [`&.${buttonClasses.containedSecondary}`]: {
    color: "#1e523d",
    backgroundColor: "aquamarine",
  }
}));

//LevelButton
const LevelButtonStyled = styled(StandartButtonStyled)(() => ({ 
  justifyContent: "left",
  width: "calc(100vw - 40px)",
  height: 80,
  maxWidth: 800,
  margin: 20,
  padding: "0px 0px 0px 50px",
  fontSize: 30,
}));

export function LevelButton(props: ButtonProps) {
  return <LevelButtonStyled variant="contained" color="inherit" {...props}/>
}

//StartButton
const StartButtonStyled = styled(StandartButtonStyled)(() => ({ 
  width: "50%",
  height: 60,
  maxWidth: 500,
  fontSize: 25,
  borderRadius: 5
}));

export function StartButton(props: ButtonProps) {
  return <StartButtonStyled variant="contained" color="secondary" {...props}/>
}

//LoginButton
const LoginButtonStyled = styled(StandartButtonStyled)(() => ({
  width: "90%",
  height: 40,
  fontSize: 16,
  fontWeight: "bold",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
  margin: 10
}));

export function LoginButton(props: ButtonProps) {
  return <LoginButtonStyled variant="contained" color="secondary" {...props}/>
}

//PeekButton and NextButton
const PeekButtonStyled = styled(StandartButtonStyled)(() => ({
  minWidth: 40,
  width: 40,
  height: 40,
  fontSize: 23,
  borderRadius: 30,
}));

export function PeekButton(props: ButtonProps) {
  return <PeekButtonStyled sx={{ justifySelf: 'right' }} variant="contained" color="inherit" {...props}/>
}

export function NextButton(props: ButtonProps) {
  return <PeekButtonStyled sx={{ justifySelf: 'left' }} variant="contained" color="inherit" {...props}/>
}

//LevelButton
const SideLevelButtonStyled = styled(StandartButtonStyled)(() => ({
  width: "100%",
  justifySelf: "center",
  height: 50,
  fontSize: 16,
  fontWeight: "bold",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  margin: 5,
  borderRadius: 10,
  padding: 5,
}));

export function SideLevelButton(props: ButtonProps & {level: number, progress: number, clicked: boolean}) {
  return (
    <SideLevelButtonStyled
      sx={{
        //sx to use prop and hover does not work otherwise
        [`&.${buttonClasses.colorInherit}`]: {
          color: "#FFFFFF",
          backgroundColor: props.clicked ? "#d9d9d9ab" : "#d9d9d94d",
        },
        "&:hover": {
          backgroundColor: "#d9d9d9ab",
        },
      }}
      variant="contained"
      color="inherit"
      {...props}
    >
      <div
        className="some-stuff"
        style={{
          width: 40,
          height: 40,
          borderRadius: 5,
          fontSize: 22,
          textAlign: "center",
          backgroundColor: "#1e523d",
        }}
      >
        {props.level}
      </div>
      <div
        style={{
          display: "flex",
          width: "calc(100% - 45px)", // sqaure width (40) + button padding (5) = 45px
          height: "95%",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <div style={{ width: "100%", height: "40%" }}> Level {props.level}</div>
        <LevelProgressBar value={props.progress} />
      </div>
    </SideLevelButtonStyled>
  );
}


