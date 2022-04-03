import React, { Fragment } from "react";
import Collapse from "@mui/material/Collapse";
import CountdownComponent from "./CountdownComponent";
import CompletedDialogComponent from "./CompletedDialogComponent";
import OperationsComponent from "./OperationsComponent";
import { Box, Fade } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  text: (props) => ({ fontSize: props.isMobile ? "32px" : "56px" }),
  start: (props) => ({
    fontSize: props.isMobile ? "42px" : "64px",
    transform: "rotate(-5deg)",
    paddingTop: "20px",
  }),
}));

export default function MathComponent(props) {
  const classes = useStyles(props);
  const [t] = useTranslation();

  return (
    <Fragment>
      <CountdownComponent
        countdonwnStart={props.countdonwnStart}
        setCountdownEnded={props.setCountdownEnded}
      />
      <Fade
        in={!props.start && !props.countdonwnStart}
        timeout={props.isMobile ? 1500 : 700}
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
        in={props.start && props.countdownEnded}
        timeout={props.isMobile ? 1500 : 700}
      >
        <OperationsComponent
          operations={props.operations}
          operationAnswer={props.operationAnswer}
          timeLeft={props.timeLeft}
          end={props.end}
          params={props.params}
          isMobile={props.isMobile}
          openCompletedDialog={props.openCompletedDialog}
        />
      </Collapse>
      <CompletedDialogComponent
        openCompletedDialog={props.openCompletedDialog}
        setOpenCompletedDialog={props.setOpenCompletedDialog}
        operations={props.correctedOperations}
        totalTime={props.timeLimit - props.timeLeft}
        isTime={props.params.isTime}
      />
    </Fragment>
  );
}
