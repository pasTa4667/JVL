import { Box, LinearProgress, LinearProgressProps, Typography, linearProgressClasses, styled } from "@mui/material";
import { KanjiGrades, gradeAsNumber } from "../utility/types";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 23,
  borderRadius: 5,
  borderStyle: "solid",
  borderWidth: 1.7,
  boxShadow: "0 5px 8px rgba(0, 0, 0, 0.2)",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "white",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: "0px 4px 4px 0px",
    backgroundColor: "#1a90ff",
  }
}));

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 15 }}>
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
