import { Params } from "@/pages/Params/types";
import { Operation } from "../../type";

export type OperationsProps = {
  operations: Operation[];
  operationAnswer: (value: string, index: number) => void;
  timeLeft: number;
  end: boolean;
  params: Params;
  isMobile: boolean;
  openCompletedDialog: boolean;
};
