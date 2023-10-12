import { useState, useEffect, Fragment } from "react";
import { hoursToSeconds, minutesToSeconds } from "date-fns";
import MathComponent from "./Math";
import { getCorrectAnswers, getOperations } from "@/services/MathService";
import { MathWrapperProps, Operation } from "./type";
import BaseLayout from "@/layout/Base";
import { dashboard } from "@/layout/Base/Base";
import DashboardComponent from "./Dashboard";

export default function MathWrapperComponent(props: MathWrapperProps) {
  const { isMobile, isMdPlus, params } = props;
  const [operations] = useState(() => getOperations(params));
  const [correctedOperations, setCorrectedOperations] = useState<Operation[]>(
    []
  );
  const [progress, setProgress] = useState(0);
  const [start, setStart] = useState(false);
  const [countdonwnStart, setCountdownStart] = useState(false);
  const [countdownEnded, setCountdownEnded] = useState(false);
  const timeLimit = getSeconds(params.time);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [openCompletedDialog, setOpenCompletedDialog] = useState(false);
  const [end, setEnd] = useState(false);
  const progressMultiplier = 100 / operations.length;

  function operationAnswer(value: string, index: number) {
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
      <BaseLayout
        isMobile={isMobile}
        componentType={dashboard}
        pxHeight={`${isMobile ? 140 : 190}px`}
      >
        <DashboardComponent
          params={params}
          operations={operations}
          start={start}
          countdownStart={countdonwnStart}
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
      </BaseLayout>
      <BaseLayout
        isMobile={isMobile}
        pxHeight={`calc(100vh - ${isMobile ? 240 : 330}px)`}
      >
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
      </BaseLayout>
    </Fragment>
  );
}

function getSeconds(date: Date) {
  date = new Date(date);
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  const dateSeconds = date.getSeconds();

  const result =
    hoursToSeconds(dateHours) + minutesToSeconds(dateMinutes) + dateSeconds;

  return result;
}
