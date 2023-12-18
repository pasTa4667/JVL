import { Box, LinearProgress, LinearProgressProps, SxProps, Theme, Typography, linearProgressClasses, styled } from "@mui/material";
import { KanjiGrades, gradeAsNumber } from "../utility/types";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 5,
  borderStyle: "solid",
  borderWidth: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: "0px 4px 4px 0px",
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  }
}));

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.tertiary"
          fontSize={18}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export function GradeProgressBarKanji(props:{ grade: KanjiGrades }) {
  const progress = gradeAsNumber(props.grade) * 20; 

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "100%", mt: 0.5, mr: 0.2, ml: 0.2 }}>
        <LinearProgress
          sx={{
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          color="primary"
          variant="determinate"
          value={progress}
        />
      </Box>
    </Box>
  );
}
