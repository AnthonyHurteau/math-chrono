import React, { Fragment } from "react";
import Collapse from "@mui/material/Collapse";
import CountdownComponent from "./CountdownComponent";
import CompletedDialogComponent from "./CompletedDialogComponent";
import OperationsComponent from "./OperationsComponent";

export default function MathComponent(props) {
  return (
    <Fragment>
      <CountdownComponent
        countdonwnStart={props.countdonwnStart}
        setCountdownEnded={props.setCountdownEnded}
      />
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
