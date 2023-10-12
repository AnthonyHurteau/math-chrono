import { Params } from "@/pages/Params/types";
import { Operation } from "../type";
import { Dispatch, SetStateAction } from "react";

export type MathProps = {
  isMobile: boolean;
  params: Params;
  operations: Operation[];
  operationAnswer: (value: string, index: number) => void;
  countdonwnStart: boolean;
  countdownEnded: boolean;
  setCountdownEnded: Dispatch<SetStateAction<boolean>>;
  start: boolean;
  end: boolean;
  timeLimit: number;
  timeLeft: number;
  openCompletedDialog: boolean;
  setOpenCompletedDialog: Dispatch<SetStateAction<boolean>>;
  correctedOperations: Operation[];
};
