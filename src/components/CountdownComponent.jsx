import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Grow from "@mui/material/Grow";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 3,
    fontSize: 200,
  },
}));

export default function CountdownComponent({
  countdonwnStart,
  setCountdownEnded,
}) {
  const classes = useStyles();
  const [countdown, setCountdown] = useState();

  useEffect(() => {
    if (countdonwnStart) {
      setCountdown(0);
    }
  }, [countdonwnStart]);

  return (
    <div className={classes.root}>
      <Grow
        in={countdown === 0}
        timeout={500}
        onEnter={() => {
          setTimeout(() => {
            setCountdown(null);
          }, 1000);
        }}
        onExited={() => setCountdown(1)}
        unmountOnExit
      >
        <div>3</div>
      </Grow>
      <Grow
        in={countdown === 1}
        timeout={500}
        onEnter={() => {
          setTimeout(() => {
            setCountdown(null);
          }, 1000);
        }}
        onExited={() => setCountdown(2)}
        unmountOnExit
      >
        <div>2</div>
      </Grow>
      <Grow
        in={countdown === 2}
        timeout={500}
        onEnter={() => {
          setTimeout(() => {
            setCountdown(null);
          }, 1000);
        }}
        onExited={() => setCountdown(3)}
        unmountOnExit
      >
        <div>1</div>
      </Grow>
      <Grow
        in={countdown === 3}
        timeout={500}
        onEnter={() => {
          setTimeout(() => {
            setCountdown(null);
          }, 1000);
        }}
        onExited={() => setCountdownEnded(true)}
        unmountOnExit
      >
        <div>GO!</div>
      </Grow>
    </div>
  );
}
