import { ThemeMode } from "@/theme/types";

type NavbarProps = {
  isMobile: boolean;
  isLarge: boolean;
  themeMode: ThemeMode;
  handleThemeModeChange: () => void;
};

export type { NavbarProps };
