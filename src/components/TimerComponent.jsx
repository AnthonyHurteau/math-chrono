import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { makeStyles } from "@mui/styles";

const timerSize = "150px";
const timerSizeMobile = "50px";
const strokeWidth = "7px";

const useStyles = makeStyles((theme) => ({
  root: (isMdPlus) => ({
    position: "relative",
    height: !isMdPlus ? timerSizeMobile : timerSize,
    width: !isMdPlus ? timerSizeMobile : timerSize,
  }),
  rootCircle: {
    fill: "none",
    stroke: "none",
  },
  rootPathElapsed: {
    strokeWidth,
    stroke: theme.palette.primary.main,
  },
  rootLabel: (isMdPlus) => ({
    position: "absolute",
    height: !isMdPlus ? timerSizeMobile : timerSize,
    width: !isMdPlus ? timerSizeMobile : timerSize,
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
  }),
  rootPathRemaining: {
    strokeWidth,
    strokeLinecap: "round",
    transform: "rotate(90deg)",
    transformOrigin: "center",
    transition: "1s linear all",
    stroke: "currentcolor",
  },
  green: {
    color: theme.palette.success.main,
  },
  orange: { color: "orange" },
  red: { color: theme.palette.error.main },
  rootSvg: {
    transform: "scaleX(-1)",
  },
}));

export default function TimerComponent({
  start,
  end,
  timeLimit,
  timeLeft,
  setTimeLeft,
  isMdPlus,
}) {
  const classes = useStyles(isMdPlus);

  const fullDashArray = 283;
  const warningThreshold = Math.floor(timeLimit / 3);
  const alertThreshold = Math.floor(timeLimit / 6);

  const colorCodes = useMemo(() => {
    return {
      info: {
        color: "green",
      },
      warning: {
        color: "orange",
        threshold: warningThreshold,
      },
      alert: {
        color: "red",
        threshold: alertThreshold,
      },
    };
  }, [warningThreshold, alertThreshold]);

  const [remainingPathColor, setRemainingPathColorState] = useState(
    colorCodes.info.color
  );
  const [strokeDashArray, setStrokeDashArray] = useState(283);

  let timerRunning = useRef(false);

  let timerInterval = useRef(null);
  let timePassed = useRef(0);

  // Divides time left by the defined time limit.
  const calculateTimeFraction = useCallback(() => {
    const rawTimeFraction = timeLeft / timeLimit;
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
  }, [timeLeft, timeLimit]);

  // Update the dasharray value as time passes, starting with 283
  const setCircleDasharray = useCallback(() => {
    const circleDasharray = `${(
      calculateTimeFraction() * fullDashArray
    ).toFixed(0)} 283`;

    setStrokeDashArray(circleDasharray);
  }, [calculateTimeFraction]);

  const setRemainingPathColor = useCallback(() => {
    const { alert, warning } = colorCodes;

    if (timeLeft <= alert.threshold) {
      setRemainingPathColorState(alert.color);
    } else if (timeLeft <= warning.threshold) {
      setRemainingPathColorState(warning.color);
    }
  }, [timeLeft, colorCodes]);

  const startTimer = useCallback(() => {
    timerRunning.current = true;

    timerInterval.current = setInterval(() => {
      // The amount of time passed increments by one
      timePassed.current++;
      setTimeLeft(timeLeft - timePassed.current);
    }, 1000);
  }, [setTimeLeft, timeLeft]);

  useEffect(() => {
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if ((timeLeft === 0 && timerRunning.current) || end) {
      clearInterval(timerInterval.current);
      timerRunning.current = false;
    }
  }, [timeLeft, end, setCircleDasharray, setRemainingPathColor]);

  useEffect(() => {
    if (start && !timerRunning.current && timeLeft > 0 && !end) {
      startTimer();
    }
  }, [start, timeLeft, end, startTimer]);

  function formatTime(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }

  return (
    <div className={classes.root}>
      {isMdPlus ? (
        <svg
          className={classes.rootSvg}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className={classes.rootCircle}>
            <circle
              className={classes.rootPathElapsed}
              cx="50"
              cy="50"
              r="45"
            />
            <path
              id="base-timer-path-remaining"
              strokeDasharray={strokeDashArray}
              className={`${classes.rootPathRemaining} ${classes[remainingPathColor]}`}
              d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
            ></path>
          </g>
        </svg>
      ) : null}
      <span
        id="base-timer-label"
        className={classes.rootLabel}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}
