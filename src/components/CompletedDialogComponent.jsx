import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide
    direction="up"
    ref={ref}
    {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: { textAlign: "center" },
  rightAnswers: {
    fontSize: "28px",
    color: theme.palette.success.main,
  },
  totalOperations: {
    fontSize: "28px",
    color: theme.palette.primary.main,
  },
}));

export default function CompletedDialogComponent(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const [t] = useTranslation();

  const handleClose = () => {
    props.setOpenCompletedDialog(false);
  };

  const rightAnswersText = () => {
    const rightAnswers = props.operations.filter((o) => o.isRightAnswer).length;
    const isSingular = (() => {
      if (i18n.language === "fr") {
        return rightAnswers <= 1;
      } else {
        return rightAnswers === 1;
      }
    })();

    return (
      <Fragment>
        <span className={classes.rightAnswers}>{rightAnswers} </span>
        {isSingular
          ? t("completed.resultText2singular")
          : t("completed.resultText2plural")}
      </Fragment>
    );
  };

  const remainingTimeText = () => {
    const timeObj = secondsToTime(props.totalTime);

    const hours =
      timeObj.hours > 0
        ? `${timeObj.hours} ${
          timeObj.hours > 1 ? t("completed.hours") : t("completed.hour")
        } `
        : "";
    const minutes =
      timeObj.minutes > 0
        ? `${timeObj.minutes} ${
          timeObj.minutes > 1 ? t("completed.minutes") : t("completed.minute")
        } `
        : "";
    const seconds = `${timeObj.seconds} ${
      timeObj.seconds > 1 ? t("completed.seconds") : t("completed.second")
    }`;

    return hours + minutes + seconds;
  };

  const completedText = () => {
    const rightAnswers = props.operations.filter((o) => o.isRightAnswer).length;
    const totalMultiplier = 100 / props.operations.length;
    const rightAnswersPourcentage = rightAnswers * totalMultiplier;

    if (rightAnswersPourcentage === 100) {
      return t("completed.done5");
    } else if (rightAnswersPourcentage >= 80) {
      return t("completed.done4");
    } else if (rightAnswersPourcentage >= 60) {
      return t("completed.done3");
    } else if (rightAnswersPourcentage >= 40) {
      return t("completed.done2");
    } else if (rightAnswersPourcentage < 40) {
      return t("completed.done1");
    }
  };

  return (
    <div>
      <Dialog
        open={props.openCompletedDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="completed-dialog"
      >
        <DialogContent className={classes.root}>
          <Typography
            color="primary"
            sx={{ fontSize: "36px" }}>
            {t("completed.title")}
          </Typography>
          <p>{t("completed.result")}</p>
          <p>
            {t("completed.resultText1")} {rightAnswersText()}{" "}
            {t("completed.resultText3")}{" "}
            <span className={classes.totalOperations}>
              {props.operations.length}
            </span>
            {props.isTime ? null : "!"}
          </p>
          {props.isTime ? (
            <p>
              {t("completed.resultText4")}{" "}
              <span className={classes.rightAnswers}>
                {remainingTimeText()}
              </span>
              !
            </p>
          ) : null}
          <Typography
            color="primary"
            sx={{ fontSize: "36px" }}>
            {completedText()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}>
            <Typography>Ok</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function secondsToTime(secs) {
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    hours,
    minutes,
    seconds,
  };
  return obj;
}
