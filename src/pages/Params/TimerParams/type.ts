import { SxObj } from "@/theme/types";
import { Params, TablesSelection } from "../types";

export type TimerParamsProps = {
  isMobile: boolean;
  params: Params;
  classes: SxObj;
  updateParams: (
    key1: keyof Params | keyof TablesSelection,
    value: Date | boolean,
    key2?: keyof Params | null,
    key3?: keyof TablesSelection | null,
    key1Value?: any | null
  ) => void;
};
