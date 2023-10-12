import { ThemeMode } from "@/theme/types";

export type HowToProps = {
  isMobile: boolean;
  isXLarge: boolean;
  themeMode: ThemeMode;
};

export type HowToMenuItem = {
  title: string;
  key: string;
  list: {
    title: string;
    key: string;
  }[];
};
