import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getOperations, getCorrectAnswers } from "./services/MathService";
import { hoursToSeconds, minutesToSeconds } from "date-fns";
import Collapse from "@mui/material/Collapse";
import CountdownComponent from "./CountdownComponent";
import CompletedDialogComponent from "./CompletedDialogComponent";
import DashboardComponent from "./DashboardComponent";
import OperationsComponent from "./OperationsComponent";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    border: "1px solid",
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.primary.main,
    padding: "2%",
    marginTop: "5%",
    marginBottom: "2%",
    height: "85vh",
    overflow: "auto",
  },
}));

export default function MathComponent(props) {
  const classes = useStyles();
  const [operations] = useState(getOperations(props.params));
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

  return (
    <Container className="container">
      <CountdownComponent
        countdonwnStart={countdonwnStart}
        setCountdownEnded={setCountdownEnded}
      />
      <Grid container>
        {/* Left margin */}
        <Grid
          item
          xs={0}
          sm={1}></Grid>
        <Grid
          item
          xs={12}
          sm={10}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.gridContainer}
          >
            <DashboardComponent
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
            />
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
              />
            </Collapse>
          </Grid>
        </Grid>
        {/* Right margin */}
        <Grid
          item
          xs={0}
          sm={1}></Grid>
      </Grid>
      <CompletedDialogComponent
        openCompletedDialog={openCompletedDialog}
        setOpenCompletedDialog={setOpenCompletedDialog}
        operations={getCorrectAnswers(operations)}
        totalTime={timeLimit - timeLeft}
        isTime={props.params.isTime}
      />
    </Container>
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
