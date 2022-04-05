import React, { useState, useEffect, Fragment } from "react";
import { getOperations, getCorrectAnswers } from "./services/MathService";
import { hoursToSeconds, minutesToSeconds } from "date-fns";
import DashboardComponent from "./DashboardComponent";
import BaseComponent, { dashboard } from "./BaseComponent";
import MathComponent from "./MathComponent";

export default function MathWrapperComponent({ isMobile, isMdPlus, params }) {
  const [operations] = useState(() => getOperations(params));
  const [correctedOperations, setCorrectedOperations] = useState([]);
  const [progress, setProgress] = useState(0);
  const [start, setStart] = useState(false);
  const [countdonwnStart, setCountdownStart] = useState(false);
  const [countdownEnded, setCountdownEnded] = useState(false);
  const timeLimit = getSeconds(params.time);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [openCompletedDialog, setOpenCompletedDialog] = useState(false);
  const [end, setEnd] = useState(false);
  const progressMultiplier = 100 / operations.length;

  function operationAnswer(value, index) {
    operations[index].answer = value;
    setNewProgress();
  }

  function setNewProgress() {
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
      <BaseComponent
        componentType={dashboard}
        pxHeight={`${isMobile ? 140 : 190}px`}
        component={
          <DashboardComponent
            params={params}
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
            isMobile={isMobile}
            isMdPlus={isMdPlus}
          />
        }
      />
      <BaseComponent
        pxHeight={`calc(100vh - ${isMobile ? 240 : 330}px)`}
        component={
          <MathComponent
            isMobile={isMobile}
            params={params}
            operations={operations}
            operationAnswer={operationAnswer}
            countdonwnStart={countdonwnStart}
            countdownEnded={countdownEnded}
            setCountdownEnded={setCountdownEnded}
            start={start}
            end={end}
            timeLimit={timeLimit}
            timeLeft={timeLeft}
            openCompletedDialog={openCompletedDialog}
            setOpenCompletedDialog={setOpenCompletedDialog}
            correctedOperations={correctedOperations}
          />
        }
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
