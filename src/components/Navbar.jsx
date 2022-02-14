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
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AboutDialogComponent from "./AboutDialogComponent";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: { zIndex: theme.zIndex.drawer + 1 },
  text: { fontFamily: "Fredericka the Great", fontSize: "22px" },
  menuItems: { width: "75px", textAlign: "center" },

  sliderRow: (props) => ({ height: props.isMobile ? "40px" : "60px" }),
}));

export default function Navbar(props) {
  const classes = useStyles();
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

  const [language, setLanguage] = React.useState(i18n.language);

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
        <Typography className={classes.text}>
          {language === "fr" ? "en" : "fr"}
        </Typography>
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
        className={classes.menuItems}>
        {m}
      </Box>
    ));
  }

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        className={classes.root}>
        <Toolbar>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to={"/"}
          >
            <Calculate />
            <Typography className={classes.text}>
              &nbsp;Math Chrono&nbsp;
            </Typography>
            <AccessAlarmIcon />
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
