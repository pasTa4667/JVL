import { ToggleButton, ToggleButtonProps, styled, toggleButtonClasses } from "@mui/material";

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