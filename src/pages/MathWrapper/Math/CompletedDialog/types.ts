import { Dispatch, SetStateAction } from "react";
import { Operation } from "../../type";

export type CompletedDialogProps = {
  openCompletedDialog: boolean;
  setOpenCompletedDialog: Dispatch<SetStateAction<boolean>>;
  operations: Operation[];
  totalTime: number;
  isTime: boolean;
};
