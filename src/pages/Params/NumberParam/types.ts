import { SxObj } from "@/theme/types";
import { Params, TablesSelection } from "../types";

export type NumberParamProps = {
  description: string;
  numberKey: keyof Params;
  value: number;
  updateParams: (
    key1: keyof Params,
    value: number | boolean | TablesSelection[],
    key2?: keyof Params | null,
    key3?: keyof TablesSelection | null,
    key1Value?: any | null
  ) => void;
  validateNumber: (value: number, min: number, max: number) => number;
  min: number;
  max: number;
  classes: SxObj;
};
