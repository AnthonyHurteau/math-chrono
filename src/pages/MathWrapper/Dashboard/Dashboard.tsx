import { Fragment } from "react";
import { Grid, Typography, Button, Box, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { SxObj } from "@/theme/types";
import { DashboardProps } from "./types";
import TimerComponent from "./Timer";

const sxStyles = (): SxObj => {
  return {
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
  };
};

export default function DashboardComponent(props: DashboardProps) {
  const {
    params,
    isMobile,
    isMdPlus,
    start,
    end,
    countdownEnded,
    setEnd,
    setOpenCompletedDialog,
    countdownStart,
    setCountdownStart,
    timeLimit,
    timeLeft,
    setTimeLeft,
    operations,
    progress,
  } = props;
  const classes = sxStyles();
  const [t] = useTranslation();

  return (
    <Box sx={classes.root}>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid
          xs={12}
          md={4}
          item
          order={{ xs: 2, sm: 1 }}
          sx={classes.stickyPadding}
        >
          {!isMobile || !params.isTime ? (
            <Box sx={classes.progressIndicator}>
              {operations.filter((o) => o.answer).length}/{operations.length}
            </Box>
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
            sx={{ ...classes.flexCenter, ...classes.stickyPadding } as SxProps}
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
          sx={
            {
              ...(isMobile && classes.rowPadding),
              ...classes.stickyPadding,
            } as SxProps
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
                if (!countdownStart) {
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
