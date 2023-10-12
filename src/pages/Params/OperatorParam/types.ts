import { SxObj } from "@/theme/types";
import { Params, TablesSelection } from "../types";

export type OperatorParamProps = {
  value: boolean;
  label: string | number;
  operatorKey?:
    | "tablesMultiplication"
    | "tablesDivision"
    | "addition"
    | "substraction"
    | "multiplication"
    | "division";
  updateParams: (
    key1: keyof Params | keyof TablesSelection,
    value: number | boolean | TablesSelection[],
    key2?: keyof Params | null,
    key3?: keyof TablesSelection | null,
    key1Value?: any | null
  ) => void;
  classes: SxObj;
  arrayName?: "tablesSelection";
  arrayKey?: keyof TablesSelection;
  arrayValueKey?: keyof TablesSelection;
  arrayKeyValue?: number;
  xs?: number;
};
