import { Button, ToggleButton, ToggleButtonProps, styled, toggleButtonClasses, buttonClasses, ButtonProps } from "@mui/material";

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
  flex: "0 1 auto",
  width: 80,
  height: 40,
  fontSize: 16,
  fontWeight: "bold",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
  marginLeft: "auto",
  marginRight: "10%",
}));

export function LoginButton(props: ButtonProps) {
  return <LoginButtonStyled variant="contained" color="secondary" {...props}/>
}

//PeekButton
const PeekButtonStyled = styled(StandartButtonStyled)(() => ({
  width: 40,
  height: 40,
  fontSize: 25,
  borderRadius: 20,
  marginLeft: 5,
}));

export function PeekButton(props: ButtonProps) {
  return <PeekButtonStyled variant="contained" color="inherit" {...props}/>
}