import React, { Fragment } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TimerComponent from "./TimerComponent";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: "-3%",
    padding: "2%",
    zIndex: 2,
    width: "100%",
  },
  flexCenter: { display: "flex", justifyContent: "center" },
  rowPadding: { paddingTop: "3%" },
  stickyPadding: { paddingBottom: "3%" },
  progressIndicator: { fontSize: "36px" },
}));

export default function DashboardComponent({
  params,
  operations,
  start,
  countdonwnStart,
  setCountdownStart,
  countdownEnded,
  timeLimit,
  timeLeft,
  setTimeLeft,
  setOpenCompletedDialog,
  end,
  setEnd,
  progress,
  isMobile,
  isMdPlus,
}) {
  const classes = useStyles();
  const [t] = useTranslation();

  return (
    <Box className={classes.root}>
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
          {!isMobile || !params.isTime ? (
            <span className={classes.progressIndicator}>
              {operations.filter((o) => o.answer).length}/{operations.length}
            </span>
          ) : null}
          <LinearProgress
            color="primary"
            variant="determinate"
            value={progress}
          />
        </Grid>
        {params.isTime ? (
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
              isMdPlus={isMdPlus}
            />
          </Grid>
        ) : null}
        <Grid
          item
          xs={12}
          md={4}
          order={{ xs: 3, sm: 2 }}
          className={
            (isMobile ? classes.rowPadding : "") + " " + classes.stickyPadding
          }
        >
          {end ? (
            <Fragment>
              <Button
                variant="contained"
                component={Link}
                to={"/params"}
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
    </Box>
  );
}
