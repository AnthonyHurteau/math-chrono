import { ThemeMode } from "@/theme/types";

export type AboutDialogProps = {
  isMobile: boolean;
  themeMode: ThemeMode;
  openAboutDialog: boolean;
  setOpenAboutDialog: React.Dispatch<React.SetStateAction<boolean>>
};
