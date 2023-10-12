import { Fragment } from "react";
import Collapse from "@mui/material/Collapse";
import { Box, Fade } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SxObj } from "@/theme/types";
import { MathProps } from "./types";
import CountdownComponent from "./Countdown";
import CompletedDialogComponent from "./CompletedDialog";
import OperationsComponent from "./Operations";

const sxStyles = (isMobile: boolean): SxObj => {
  return {
    text: { fontSize: isMobile ? "32px" : "56px" },
    start: {
      fontSize: isMobile ? "42px" : "64px",
      transform: "rotate(-5deg)",
      paddingTop: "20px",
    },
  };
};

export default function MathComponent(props: MathProps) {
  const {
    start,
    operations,
    operationAnswer,
    timeLeft,
    end,
    params,
    isMobile,
    countdownEnded,
    setCountdownEnded,
    countdonwnStart,
    timeLimit,
    openCompletedDialog,
    setOpenCompletedDialog,
    correctedOperations,
  } = props;
  const classes = sxStyles(isMobile);
  const [t] = useTranslation();

  return (
    <Fragment>
      <CountdownComponent
        countdonwnStart={countdonwnStart}
        setCountdownEnded={setCountdownEnded}
      />
      <Fade
        in={!start && !countdonwnStart}
        timeout={isMobile ? 1500 : 700}
        unmountOnExit={true}
      >
        <Box>
          <Box sx={classes.text}>{t("math.text1")}</Box>
          <br />
          <Box sx={classes.start}>{t("math.start")}</Box>
          <br />
          <Box sx={classes.text}>{t("math.text2")}</Box>
        </Box>
      </Fade>
      <Collapse in={start && countdownEnded} timeout={isMobile ? 1500 : 700}>
        <OperationsComponent
          operations={operations}
          operationAnswer={operationAnswer}
          timeLeft={timeLeft}
          end={end}
          params={params}
          isMobile={isMobile}
          openCompletedDialog={openCompletedDialog}
        />
      </Collapse>
      <CompletedDialogComponent
        openCompletedDialog={openCompletedDialog}
        setOpenCompletedDialog={setOpenCompletedDialog}
        operations={correctedOperations}
        totalTime={timeLimit - timeLeft}
        isTime={params.isTime}
      />
    </Fragment>
  );
}
