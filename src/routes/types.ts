import { Params } from "@/pages/Params/types";
import { ThemeMode } from "@/theme/types";
import { Dispatch, SetStateAction } from "react";

export type RoutingProps = {
  isMobile: boolean;
  isMdPlus: boolean;
  isXLarge: boolean;
  isHeightLarge: boolean;
  themeMode: ThemeMode;
  params: Params;
  setParams: Dispatch<SetStateAction<Params>>;
};
