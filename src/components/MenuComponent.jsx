import React, { Fragment, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@mui/styles";
import LanguageMenuComponent from "./LanguageMenuComponent";

const useStyles = makeStyles((theme) => ({
  menuItems: {
    width: "75px",
    textAlign: "center",
  },
}));

export default function MenuComponent(props) {
  const classes = useStyles();

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
      <IconButton
        aria-label="dark-light-button"
        key={"themeModeToggle"}
        color="primary"
        onClick={() => props.handleThemeModeChange()}
      >
        {props.themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    );
  }

  function aboutToggleItem() {
    return (
      <IconButton
        aria-label="info-button"
        key={"aboutToggle"}
        color="primary"
        onClick={() => {
          props.setOpenAboutDialog(true);
        }}
      >
        <InfoOutlinedIcon />
      </IconButton>
    );
  }

  function menuItems() {
    const menuItems = [
      <LanguageMenuComponent
        isMobile={props.isMobile}
        handleTopMenuClose={handleClose}
      />,
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
    <Fragment>
      {props.isMobile ? (
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
