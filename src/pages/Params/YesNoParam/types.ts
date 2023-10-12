import { SxObj } from "@/theme/types";
import { Params, TablesSelection } from "../types";
import { Dispatch, SetStateAction } from "react";

export type YesNoParamProps = {
  description: string;
  value: boolean;
  yesNoKey: keyof Params;
  updateParams: (
    key1: keyof Params,
    value: number | boolean | TablesSelection[],
    key2?: keyof Params | null,
    key3?: keyof TablesSelection | null,
    key1Value?: any | null
  ) => void;
  label: string;
  toggleTrue: boolean;
  setToggleTrue: Dispatch<SetStateAction<boolean>>;
  toggleFalse: boolean;
  setToggleFalse: Dispatch<SetStateAction<boolean>>;
  yesLabel?: string;
  noLabel?: string;
  classes: SxObj;
};
