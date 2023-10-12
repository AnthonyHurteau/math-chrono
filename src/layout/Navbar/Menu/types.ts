import { ThemeMode } from "@/theme/types";

export type MenuProps = {
  isLarge: boolean;
  setOpenAboutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  themeMode: ThemeMode;
  handleThemeModeChange: () => void;
};
