import { Box, LinearProgress, LinearProgressProps, Typography, linearProgressClasses, styled } from "@mui/material";
import { KanjiGrades, gradeAsNumber } from "../utility/types";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  height: 15,
  borderRadius: 15,
  boxShadow: "0 5px 8px rgba(0, 0, 0, 0.2)",
  marginBottom: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: "0px 15px 15px 0px",

    backgroundColor: "#426A5A",
  },
}));

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number, level: number }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ minWidth: 15, mb: "8px" }}>
        <Typography
          variant="body2"
          fontSize={20}
          sx={{ fontStyle: "bold", color: "#426A5A" }}
        >{`Level ${props.level} at ${Math.round(props.value)}%`}</Typography>
      </Box>
      <BorderLinearProgress variant="determinate" {...props} />
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

export function LevelProgressBar(props: { value: number }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "100%", mt: 1, mr: 1, ml: 1 }}>
        <LinearProgress
          sx={{
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          color="primary"
          variant="determinate"
          value={props.value}
        />
      </Box>
    </Box>
  );
}
