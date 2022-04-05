import React, { Fragment } from "react";
import Collapse from "@mui/material/Collapse";
import CountdownComponent from "./CountdownComponent";
import CompletedDialogComponent from "./CompletedDialogComponent";
import OperationsComponent from "./OperationsComponent";
import { Box, Fade } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  text: (isMobile) => ({ fontSize: isMobile ? "32px" : "56px" }),
  start: (isMobile) => ({
    fontSize: isMobile ? "42px" : "64px",
    transform: "rotate(-5deg)",
    paddingTop: "20px",
  }),
}));

export default function MathComponent({
  isMobile,
  params,
  operations,
  operationAnswer,
  countdonwnStart,
  countdownEnded,
  setCountdownEnded,
  start,
  end,
  timeLimit,
  timeLeft,
  openCompletedDialog,
  setOpenCompletedDialog,
  correctedOperations,
}) {
  const classes = useStyles(isMobile);
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
          <span className={classes.text}>{t("math.text1")}</span>
          <br />
          <Box className={`${classes.text} ${classes.start}`}>
            {t("math.start")}
          </Box>
          <br />
          <span className={classes.text}>{t("math.text2")}</span>
        </Box>
      </Fade>
      <Collapse
        in={start && countdownEnded}
        timeout={isMobile ? 1500 : 700}>
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
