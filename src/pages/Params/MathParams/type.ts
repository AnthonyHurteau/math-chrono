import { SxObj } from "@/theme/types";
import { Params, TablesSelection, ValidationMinMax } from "../types";

export type MathParamsProps = {
  params: Params;
  operandsMax: number;
  updateParams: (
    key1: keyof Params | keyof TablesSelection,
    value: number | boolean |  TablesSelection[],
    key2?: keyof Params | null,
    key3?: keyof TablesSelection | null,
    key1Value?: any | null
  ) => void;
  validateNumber: (value: number, min: number, max: number) => number;
  classes: SxObj;
  validationMinMax: ValidationMinMax;
};
