import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import { useTranslation } from "react-i18next";
import { SxObj } from "@/theme/types";
import { HowToMenuProps } from "./types";
import { Link } from "react-router-dom";

const sxStyles = (isMobile: boolean): SxObj => {
  return {
    tableOfContents: { textAlign: "center", padding: "2%" },
    list: {
      fontSize: "18px",
      padding: "2%",
      width: isMobile ? "100vw" : "350px",
      height: "100vh",
    },
    buttonContainer: {
      position: "fixed",
      top: isMobile ? null : "100px",
      left: isMobile ? null : "50px",
      bottom: isMobile ? 0 : null,
      right: isMobile ? "30px" : null,
    },
  };
};

export default function HowToMenu(props: HowToMenuProps) {
  const { isMobile, menuItems } = props;
  const [t] = useTranslation();
  const classes = sxStyles(isMobile);

  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const list = (
    <Box
      sx={classes.list}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={classes.tableOfContents}>
        <span>{t("howTo.tableOfContent")}</span>
      </Box>
      <Divider />
      <ol>
        {menuItems.map((m, i) => (
          <li key={`${m.key}Menu${i}`}>
            <Link to={`#${m.key}${i}`}>
              <Box>{m.title}</Box>
            </Link>
            {m.list.length > 0 ? (
              <ul>
                {m.list.map((ml, i) => (
                  <li key={`${m.key}MenuList${i}`}>
                    <Link to={`#${ml.key}${i}`}>
                      <Box>{ml.title}</Box>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </Box>
  );

  return (
    <Fragment>
      <Box sx={classes.buttonContainer}>
        <Fab color="secondary" onClick={toggleDrawer(true)}>
          <FormatListNumbered />
        </Fab>
      </Box>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </Fragment>
  );
}
