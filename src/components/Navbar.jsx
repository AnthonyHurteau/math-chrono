import React, { useState, Fragment, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Calculate from "@mui/icons-material/Calculate";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Link } from "react-router-dom";
import AboutDialogComponent from "./AboutDialogComponent";
import { makeStyles } from "@mui/styles";
import MenuComponent from "./MenuComponent";

const useStyles = makeStyles((theme) => ({
  root: { zIndex: theme.zIndex.drawer + 1 },
  text: { fontSize: "22px" },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const [openAboutDialog, setOpenAboutDialog] = useState(false);
  const isXSmall = window.screen.width <= 330;

  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={classes.root}
        color="secondary"
        enableColorOnDark
      >
        <Toolbar>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={"/params"}
          >
            {isXSmall ? null : <Calculate />}
            <Typography className={classes.text}>
              &nbsp;Math Chrono&nbsp;
            </Typography>
            {isXSmall ? null : <AccessAlarmIcon />}
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <MenuComponent
            isLarge={props.isLarge}
            setOpenAboutDialog={setOpenAboutDialog}
            themeMode={props.themeMode}
            handleThemeModeChange={props.handleThemeModeChange}
          />
        </Toolbar>
      </AppBar>
      <AboutDialogComponent
        isMobile={props.isMobile}
        themeMode={props.themeMode}
        openAboutDialog={openAboutDialog}
        setOpenAboutDialog={setOpenAboutDialog}
      />
    </Fragment>
  );
}
