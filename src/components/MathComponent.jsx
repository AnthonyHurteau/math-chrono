import React, { useState, useEffect, Fragment } from "react";
import { getOperations, getCorrectAnswers } from "./services/MathService";
import { hoursToSeconds, minutesToSeconds } from "date-fns";
import Collapse from "@mui/material/Collapse";
import CountdownComponent from "./CountdownComponent";
import CompletedDialogComponent from "./CompletedDialogComponent";
import DashboardComponent from "./DashboardComponent";
import OperationsComponent from "./OperationsComponent";

export default function MathComponent(props) {
  const [operations] = useState(() => getOperations(props.params));
  const [correctedOperations, setCorrectedOperations] = useState([]);
  const [progress, setProgress] = useState(0);
  const [start, setStart] = useState(false);
  const [countdonwnStart, setCountdownStart] = useState(false);
  const [countdownEnded, setCountdownEnded] = useState(false);
  const timeLimit = getSeconds(props.params.time);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [openCompletedDialog, setOpenCompletedDialog] = useState(false);
  const [end, setEnd] = useState(false);

  function operationAnswer(value, id) {
    operations.find((o) => o.id === id).answer = value;
    setNewProgress();
  }

  function setNewProgress() {
    const progressMultiplier = 100 / operations.length;
    const currentProgress = operations.filter((o) => o.answer).length;
    setProgress(currentProgress * progressMultiplier);
  }

  useEffect(() => {
    if (countdownEnded) {
      setStart(true);
    }
  }, [countdownEnded]);

  useEffect(() => {
    if (end) {
      setCorrectedOperations(getCorrectAnswers(operations));
    }
  }, [end, operations]);

  return (
    <Fragment>
      <CountdownComponent
        countdonwnStart={countdonwnStart}
        setCountdownEnded={setCountdownEnded}
      />
      {/* <DashboardComponent
        params={props.params}
        operations={operations}
        start={start}
        countdonwnStart={countdonwnStart}
        setCountdownStart={setCountdownStart}
        countdownEnded={countdownEnded}
        timeLimit={timeLimit}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        setOpenCompletedDialog={setOpenCompletedDialog}
        end={end}
        setEnd={setEnd}
        progress={progress}
        isMobile={props.isMobile}
      /> */}
      <Collapse
        in={start && countdownEnded}
        timeout={props.isMobile ? 1500 : 700}
      >
        <OperationsComponent
          operations={operations}
          operationAnswer={operationAnswer}
          timeLeft={timeLeft}
          end={end}
          params={props.params}
          isMobile={props.isMobile}
          openCompletedDialog={openCompletedDialog}
        />
      </Collapse>
      <CompletedDialogComponent
        openCompletedDialog={openCompletedDialog}
        setOpenCompletedDialog={setOpenCompletedDialog}
        operations={correctedOperations}
        totalTime={timeLimit - timeLeft}
        isTime={props.params.isTime}
      />
    </Fragment>
  );
}

function getSeconds(dateString) {
  const date = new Date(dateString);
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  const dateSeconds = date.getSeconds();

  const result =
    hoursToSeconds(dateHours) + minutesToSeconds(dateMinutes) + dateSeconds;

  return result;
}
