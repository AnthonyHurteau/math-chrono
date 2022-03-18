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
  list: (props) => ({
    fontSize: "18px",
    padding: "2%",
    width: props.isMobile ? "100vw" : "350px",
    height: "100vh",
  }),
  buttonContainer: (props) => ({
    position: "sticky",
    top: props.isMobile ? "calc(100vh - 75px)" : "100px",
    textAlign: "left",
    marginLeft: props.isXLarge ? "-45%" : props.isMobile ? null : "-25%",
  }),
}));

export default function HowToMenu(props) {
  const [t] = useTranslation();
  const classes = useStyles(props);

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
        {props.menuItems.map((m, i) => (
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
          color="primary"
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
