import { Dispatch, SetStateAction } from "react";
import { Params, TablesSelection, ValidationMinMax } from "../types";
import { SxObj } from "@/theme/types";

export type TablesParamProps = {
  params: Params;
  setParams: Dispatch<SetStateAction<Params>>;
  classes: SxObj;
  updateParams: (
    key1: keyof Params | keyof TablesSelection,
    value: number | boolean | TablesSelection[],
    key2?: keyof Params | null,
    key3?: keyof TablesSelection | null,
    key1Value?: any | null
  ) => void;
  validationMinMax: ValidationMinMax;
};

export type TablesMaximumOptions = {
  label: number;
  value: number;
};
