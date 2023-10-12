import { SxObj } from "@/theme/types";
import { Params, TablesSelection } from "../types";

export type NegativeParamsProps = {
  params: Params;
  isMobile: boolean;
  updateParams: (
    key1: keyof Params | keyof TablesSelection,
    value: number | boolean | TablesSelection[],
    key2?: keyof Params | null,
    key3?: keyof TablesSelection | null,
    key1Value?: any | null
  ) => void;
  classes: SxObj;
};
