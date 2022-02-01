import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Calculate from "@mui/icons-material/Calculate";
import { useTranslation } from "react-i18next";

import AboutDialogComponent from "./AboutDialogComponent";

export default function Navbar(props) {
  const { i18n } = useTranslation();
  const [openAboutDialog, setOpenAboutDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [language, setLanguage] = React.useState(i18n.languages);

  const languageToggle = () => {
    setLanguage((l) => (l === "fr" ? "en" : "fr"));
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  function languageToggleItem() {
    return (
      <Button
        key={"languageToggle"}
        variant="outlined"
        color="secondary"
        onClick={languageToggle}
      >
        {language === "fr" ? "en" : "fr"}
      </Button>
    );
  }

  function themeModeToggleItem() {
    return (
      <IconButton
        key={"themeModeToggle"}
        color="secondary"
        onClick={() => props.handleThemeModeChange()}
      >
        {props.themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    );
  }

  function aboutToggleItem() {
    return (
      <IconButton
        key={"aboutToggle"}
        color="secondary"
        onClick={() => {
          setOpenAboutDialog(true);
        }}
      >
        <InfoOutlinedIcon />
      </IconButton>
    );
  }

  function menuItems() {
    const menuItems = [
      languageToggleItem(),
      themeModeToggleItem(),
      aboutToggleItem(),
    ];

    return menuItems.map((m, i) => (
      <Box
        key={`menuItemBox${i}`}
        sx={{ width: "75px", textAlign: "center" }}>
        {m}
      </Box>
    ));
  }

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Button
            variant="outlined"
            color="secondary">
            <Calculate />
            <Typography variant="h6">&nbsp;Math Chrono</Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {props.isMobile ? (
            <Box>
              <IconButton onClick={handleClick}>
                <MoreVertIcon color="secondary" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                {menuItems().map((m, i) => (
                  <MenuItem
                    key={`menuItem${i}`}
                    onClick={handleClose}>
                    {m}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            menuItems().map((m) => m)
          )}
        </Toolbar>
      </AppBar>
      <AboutDialogComponent
        openAboutDialog={openAboutDialog}
        setOpenAboutDialog={setOpenAboutDialog}
      />
    </React.Fragment>
  );
}
