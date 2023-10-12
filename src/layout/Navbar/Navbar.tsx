import React, { useState, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useTheme,
  Theme,
} from "@mui/material";
import Calculate from "@mui/icons-material/Calculate";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Link } from "react-router-dom";
import { NavbarProps } from "./types";
import { SxObj } from "@/theme/types";
import AboutDialog from "@/layout/Navbar/AboutDialog";
import MenuComponent from "@/layout/Navbar/Menu/Menu";

const sxStyles = (theme: Theme): SxObj => {
  return {
    root: { zIndex: theme.zIndex.drawer + 1 },
    text: { fontSize: "22px" },
  };
};

export default function Navbar(props: NavbarProps) {
  const { isMobile, isLarge, themeMode, handleThemeModeChange } = props;
  const [openAboutDialog, setOpenAboutDialog] = useState(false);
  const isXSmall = window.screen.width <= 330;
  const theme = useTheme();
  const classes = sxStyles(theme);

  return (
    <Fragment>
      <AppBar
        position="fixed"
        color="secondary"
        enableColorOnDark
        sx={classes.root}
      >
        <Toolbar>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={"/params"}
          >
            {isXSmall ? null : <Calculate />}
            <Typography sx={classes.text}>&nbsp;Math Chrono&nbsp;</Typography>
            {isXSmall ? null : <AccessAlarmIcon />}
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <MenuComponent
            isLarge={isLarge}
            setOpenAboutDialog={setOpenAboutDialog}
            themeMode={themeMode}
            handleThemeModeChange={handleThemeModeChange}
          />
        </Toolbar>
      </AppBar>
      <AboutDialog
        isMobile={isMobile}
        themeMode={themeMode}
        openAboutDialog={openAboutDialog}
        setOpenAboutDialog={setOpenAboutDialog}
      />
    </Fragment>
  );
}
