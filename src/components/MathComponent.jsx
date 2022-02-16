import React, { useState, useEffect, Fragment } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getOperations, getCorrectAnswers } from "./services/MathService";
import TimerComponent from "./TimerComponent";
import { hoursToSeconds, minutesToSeconds } from "date-fns";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import CountdownComponent from "./CountdownComponent";
import CompletedDialogComponent from "./CompletedDialogComponent";

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
  flexCenter: { display: "flex", justifyContent: "center" },
  rowPadding: { paddingTop: "3%" },
  stickyPadding: { paddingBottom: "3%" },
  operation: { paddingBottom: "15px", display: "flex", alignItems: "baseline" },
  sticky: {
    position: "sticky",
    top: "-3%",
    padding: "2%",
    backgroundColor: theme.palette.background.default,
    zIndex: 2,
    width: "100%",
  },
  progressIndicator: { fontSize: "36px" },
  answerBox: {
    display: "flex",

    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    transition: "2s",
    padding: "5px",
  },
  rightAnswer: {
    backgroundColor: alpha(theme.palette.success.main, 0.3),
  },
  wrongAnswer: {
    backgroundColor: alpha(theme.palette.error.main, 0.3),
  },
  textFieldBox: {
    width: "90px",
    flex: "0 0 auto",
  },
}));

export default function MathComponent(props) {
  const classes = useStyles();
  const [t] = useTranslation();
  const [operations] = useState(getOperations(props.params));
  const [progress, setProgress] = useState(0);

  const [start, setStart] = useState(false);
  const [countdonwnStart, setCountdownStart] = useState(false);
  const [countdownEnded, setCountdownEnded] = useState(false);
  const timeLimit = getSeconds(props.params.time);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [openCompletedDialog, setOpenCompletedDialog] = useState(false);
  const [end, setEnd] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);

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

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      console.log(event);
      // const form = event.target.form;
      // const index = [...form].indexOf(event.target);
      // form.elements[index + 1].focus();
      setFocusIndex(focusIndex + 1);
      event.preventDefault();
    }
  };

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
            <div className={classes.sticky}>
              <Grid
                container
                justifyContent="space-around"
                alignItems="center">
                <Grid
                  xs={12}
                  md={4}
                  item
                  order={{ xs: 2, sm: 1 }}
                  className={classes.stickyPadding}
                >
                  {!props.isMobile ? (
                    <span className={classes.progressIndicator}>
                      {operations.filter((o) => o.answer).length}/
                      {operations.length}
                    </span>
                  ) : null}
                  <LinearProgress
                    color="primary"
                    variant="determinate"
                    value={progress}
                  />
                </Grid>
                {props.params.isTime ? (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    order={{ xs: 1, sm: 3 }}
                    className={classes.flexCenter + " " + classes.stickyPadding}
                  >
                    <TimerComponent
                      start={start}
                      end={end}
                      timeLimit={timeLimit}
                      timeLeft={timeLeft}
                      setTimeLeft={setTimeLeft}
                      isMobile={props.isMobile}
                    />
                  </Grid>
                ) : null}
                <Grid
                  item
                  xs={12}
                  md={4}
                  order={{ xs: 3, sm: 2 }}
                  className={
                    (props.isMobile ? classes.rowPadding : "") +
                    " " +
                    classes.stickyPadding
                  }
                >
                  {end ? (
                    <Fragment>
                      <Button
                        variant="contained"
                        component={Link}
                        to={"/"}
                        color="primary"
                      >
                        <Typography>{t("math.back")}</Typography>
                      </Button>
                    </Fragment>
                  ) : start && countdownEnded && !end ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setEnd(true);
                        setOpenCompletedDialog(true);
                      }}
                    >
                      <Typography color="black">{t("math.done")}</Typography>
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        if (!countdonwnStart) {
                          setCountdownStart(true);
                        }
                      }}
                    >
                      <Typography>{t("math.start")}</Typography>
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
            <Collapse
              in={start && countdownEnded}
              timeout={props.isMobile ? 1500 : 700}
            >
              <form>
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={2}
                  className={classes.rowPadding}
                >
                  {operations.map((o, i) => (
                    <Grid
                      item
                      key={"operation-" + i}
                      className={classes.operation}
                    >
                      <Box
                        className={
                          end
                            ? o.isRightAnswer
                              ? classes.answerBox + " " + classes.rightAnswer
                              : classes.answerBox + " " + classes.wrongAnswer
                            : classes.answerBox
                        }
                      >
                        <Box>{o.operationText}</Box>
                        <Box>&nbsp;=&nbsp;</Box>
                        <Box className={classes.textFieldBox}>
                          <TextField
                            id={"input-" + i}
                            label={t("params.numberLabel")}
                            disabled={timeLeft === 0 || end}
                            type="number"
                            variant="outlined"
                            color="primary"
                            inputRef={(input) => {
                              if (input !== null && i === focusIndex) {
                                input.focus();
                              }
                            }}
                            onKeyPress={(event) => {
                              handleEnter(event);
                            }}
                            onFocus={() => {
                              setFocusIndex(i);
                            }}
                            onChange={(event) => {
                              operationAnswer(event.target.value, o.id);
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </form>
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
