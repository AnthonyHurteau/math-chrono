import { Dispatch, SetStateAction } from "react";

export type CountdownProps = {
  countdonwnStart: boolean;
  setCountdownEnded: Dispatch<SetStateAction<boolean>>;
};
