import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getOperations } from "./services/MathService";
import TimerComponent from "./TimerComponent";
import { hoursToSeconds, minutesToSeconds } from "date-fns";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import CountdownComponent from "./CountdownComponent";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    border: "1px solid",
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.secondary.main,
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
}));

export default function MathComponent(props) {
  const classes = useStyles();
  const [t] = useTranslation();
  const [operations, setOperations] = useState(getOperations(props.params));
  const [progress, setProgress] = useState(0);

  const [start, setStart] = useState(false);
  const [countdonwnStart, setCountdownStart] = useState(false);
  const [countdownEnded, setCountdownEnded] = useState(false);
  const timeLimit = getSeconds(props.params.time);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

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
            <div className={classes.sticky}>
              <Grid
                container
                justifyContent="space-around"
                alignItems="center">
                <Grid
                  xs={12}
                  sm={4}
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
                    color="secondary"
                    variant="determinate"
                    value={progress}
                  />
                </Grid>
                {props.params.isTime ? (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    order={{ xs: 1, sm: 2 }}
                    className={classes.flexCenter + " " + classes.stickyPadding}
                  >
                    <TimerComponent
                      start={start}
                      timeLimit={timeLimit}
                      timeLeft={timeLeft}
                      setTimeLeft={setTimeLeft}
                    />
                  </Grid>
                ) : null}
                <Grid
                  item
                  xs={12}
                  sm={4}
                  order={{ xs: 3, sm: 3 }}
                  className={
                    (props.isMobile ? classes.rowPadding : "") +
                    " " +
                    classes.stickyPadding
                  }
                >
                  {start && countdownEnded ? (
                    <Button
                      variant="contained"
                      color="error"
                      component={Link}
                      to={"/"}
                      onClick={() => {}}
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
                    {o.operationText}
                    &nbsp;
                    <TextField
                      label={t("params.numberLabel")}
                      disabled={timeLeft === 0 ? true : false}
                      type="number"
                      variant="outlined"
                      color="secondary"
                      sx={{ width: "90px" }}
                      onChange={(event) => {
                        operationAnswer(event.target.value, o.id);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        {/* Right margin */}
        <Grid
          item
          xs={0}
          sm={1}></Grid>
      </Grid>
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
