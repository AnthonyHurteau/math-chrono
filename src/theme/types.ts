import { SxProps } from "@mui/material";

export type ThemeMode = "dark" | "light";

export type CustomThemeProviderProps = {
  children: JSX.Element;
};

export type SxObj = {
  [index: string]: SxProps;
};
