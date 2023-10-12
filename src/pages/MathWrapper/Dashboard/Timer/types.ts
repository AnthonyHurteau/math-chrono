import { Dispatch, SetStateAction } from "react";

export type TimerProps = {
  start: boolean;
  end: boolean;
  timeLimit: number;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  isMdPlus: boolean;
};

export type Colors = "green" | "orange" | "red";

export type ColoreCodes = {
  info: {
    color: Colors;
  };
  warning: {
    color: Colors;
    threshold: number;
  };
  alert: {
    color: Colors;
    threshold: number;
  };
};
