import { TablesMaximumOptions } from "../TablesParam/types";
import { Params, TablesSelection, ValidationMinMax } from "../types";
import { SxObj } from "@/theme/types";

export type SelectParamProps = {
  description: string;
  selectKey: keyof Params;
  label: string;
  value: number;
  options: TablesMaximumOptions[];
  updateParams: (
    key1: keyof Params,
    value: number | boolean | TablesSelection[],
    key2?: keyof Params | null,
    key3?: keyof TablesSelection | null,
    key1Value?: any | null
  ) => void;
  classes: SxObj;
};
