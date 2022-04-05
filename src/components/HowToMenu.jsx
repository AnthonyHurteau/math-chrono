import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import { makeStyles } from "@mui/styles";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  tableOfContents: { textAlign: "center", padding: "2%" },
  list: (isMobile) => ({
    fontSize: "18px",
    padding: "2%",
    width: isMobile ? "100vw" : "350px",
    height: "100vh",
  }),
  buttonContainer: (isMobile) => ({
    position: "fixed",
    top: isMobile ? null : "100px",
    left: isMobile ? null : "50px",
    bottom: isMobile ? 0 : null,
    right: isMobile ? "30px" : null,
  }),
}));

export default function HowToMenu({ menuItems, isMobile }) {
  const [t] = useTranslation();
  const classes = useStyles(isMobile);

  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
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
      className={classes.list}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box className={classes.tableOfContents}>
        <span>{t("howTo.tableOfContent")}</span>
      </Box>
      <Divider />
      <ol>
        {menuItems.map((m, i) => (
          <li key={`${m.key}Menu${i}`}>
            <HashLink
              to={`/howTo#${m.key}${i}`}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
            >
              <Box>{m.title}</Box>
            </HashLink>
            {m.list.length > 0 ? (
              <ul>
                {m.list.map((ml, i) => (
                  <li key={`${m.key}MenuList${i}`}>
                    <HashLink
                      to={`/howTo#${ml.key}${i}`}
                      scroll={(el) =>
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                          inline: "nearest",
                        })
                      }
                    >
                      <Box>{ml.title}</Box>
                    </HashLink>
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
      <Box className={classes.buttonContainer}>
        <Fab
          color="secondary"
          onClick={toggleDrawer(true)}>
          <FormatListNumbered />
        </Fab>
      </Box>
      <Drawer
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </Fragment>
  );
}
