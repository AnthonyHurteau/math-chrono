import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AppSettings from "../AppSettings";
import { makeStyles } from "@mui/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide
    direction="up"
    ref={ref}
    {...props} />;
});

const useStyles = makeStyles((theme) => ({
  email: (props) => ({
    fontSize: props.isMobile ? "5vw" : null,
  }),
}));

export default function AboutDialogComponent(props) {
  const classes = useStyles(props);
  const [t] = useTranslation();

  const handleClose = () => {
    props.setOpenAboutDialog(false);
  };

  return (
    <div>
      <Dialog
        open={props.openAboutDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="about-dialog"
      >
        <DialogContent>
          <Typography
            color={props.themeMode === "dark" ? "primary" : "secondary"}
            sx={{ fontSize: "36px" }}
          >
            {t("aboutDialog.title")}
          </Typography>
          <br />
          <Typography
            color={props.themeMode === "dark" ? "primary" : "secondary"}
          >
            Version {AppSettings.version}
          </Typography>
          <br />
          <p>{t("aboutDialog.text1")}</p>
          <p>{t("aboutDialog.text2")}</p>
          <p>
            <a
              href="mailto:hurteau.anthony123@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.email}
            >
              hurteau.anthony123@gmail.com
            </a>
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}>
            <Typography>Ok</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
