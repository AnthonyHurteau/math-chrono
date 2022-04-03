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

export default function DashboardComponent(props) {
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
          {!props.isMobile || !props.params.isTime ? (
            <span className={classes.progressIndicator}>
              {props.operations.filter((o) => o.answer).length}/
              {props.operations.length}
            </span>
          ) : null}
          <LinearProgress
            color="primary"
            variant="determinate"
            value={props.progress}
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
              start={props.start}
              end={props.end}
              timeLimit={props.timeLimit}
              timeLeft={props.timeLeft}
              setTimeLeft={props.setTimeLeft}
              isMdPlus={props.isMdPlus}
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
          {props.end ? (
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
          ) : props.start && props.countdownEnded && !props.end ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                props.setEnd(true);
                props.setOpenCompletedDialog(true);
              }}
            >
              <Typography color="black">{t("math.done")}</Typography>
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                if (!props.countdonwnStart) {
                  props.setCountdownStart(true);
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
