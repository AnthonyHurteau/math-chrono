import React, { Fragment, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Box, IconButton, Button, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@mui/styles";
import LanguageMenuComponent from "./LanguageMenuComponent";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  menuItems: (props) => ({
    textAlign: "center",
    marginRight: props.isLarge ? "10px" : null,
  }),
  button: {
    width: "200px",
  },
  icon: { marginRight: "10px" },
}));

export default function MenuComponent(props) {
  const [t] = useTranslation();
  const classes = useStyles(props);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function themeModeToggleItem() {
    return (
      <Button
        variant="contained"
        className={classes.button}
        aria-label="dark-light-button"
        key={"themeModeToggle"}
        color="secondary"
        onClick={() => props.handleThemeModeChange()}
      >
        {props.themeMode === "dark" ? (
          <Brightness7Icon className={classes.icon} />
        ) : (
          <Brightness4Icon className={classes.icon} />
        )}
        <Typography>{t("navbar.appearance")}</Typography>
      </Button>
    );
  }

  function howToButton() {
    return (
      <Button
        variant="contained"
        className={classes.button}
        aria-label="help-button"
        key={"helpButton"}
        color="secondary"
        component={Link}
        to={"/howto"}
      >
        <HelpOutlineIcon className={classes.icon} />
        <Typography>{t("navbar.help")}</Typography>
      </Button>
    );
  }

  function aboutToggleItem() {
    return (
      <Button
        variant="contained"
        className={classes.button}
        aria-label="info-button"
        key={"aboutToggle"}
        color="secondary"
        onClick={() => {
          props.setOpenAboutDialog(true);
        }}
      >
        <InfoOutlinedIcon className={classes.icon} />
        <Typography>{t("navbar.about")}</Typography>
      </Button>
    );
  }

  function menuItems() {
    const menuItems = [
      <LanguageMenuComponent
        isLarge={props.isLarge}
        handleTopMenuClose={handleClose}
        button={classes.button}
        icon={classes.icon}
      />,
      themeModeToggleItem(),
      howToButton(),
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
    <Fragment>
      {!props.isLarge ? (
        <Box>
          <IconButton
            aria-label="menu-button"
            onClick={handleClick}>
            <MoreVertIcon color="primary" />
          </IconButton>
          <Menu
            id="navMenu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {menuItems().map((m, i) => (
              <MenuItem
                key={`menuItem${i}`}
                onClick={i !== 0 ? handleClose : null}
              >
                {m}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        menuItems().map((m) => m)
      )}
    </Fragment>
  );
}
