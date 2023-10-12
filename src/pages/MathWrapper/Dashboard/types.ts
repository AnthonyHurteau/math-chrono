import { Dispatch, SetStateAction } from "react";
import { Operation } from "../type";
import { Params } from "@/pages/Params/types";

export type DashboardProps = {
  params: Params;
  operations: Operation[];
  start: boolean;
  countdownStart: boolean;
  setCountdownStart: Dispatch<SetStateAction<boolean>>;
  countdownEnded: boolean;
  timeLimit: number;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  setOpenCompletedDialog: Dispatch<SetStateAction<boolean>>;
  end: boolean;
  setEnd: Dispatch<SetStateAction<boolean>>;
  progress: number;
  isMobile: boolean;
  isMdPlus: boolean;
};
