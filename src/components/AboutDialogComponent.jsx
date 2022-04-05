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
  email: (isMobile) => ({
    fontSize: isMobile ? "5vw" : null,
  }),
}));

export default function AboutDialogComponent({
  isMobile,
  themeMode,
  openAboutDialog,
  setOpenAboutDialog,
}) {
  const classes = useStyles(isMobile);
  const [t] = useTranslation();

  const handleClose = () => {
    setOpenAboutDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openAboutDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="about-dialog"
      >
        <DialogContent>
          <Typography
            color={themeMode === "dark" ? "primary" : "secondary"}
            sx={{ fontSize: "36px" }}
          >
            {t("aboutDialog.title")}
          </Typography>
          <br />
          <Typography color={themeMode === "dark" ? "primary" : "secondary"}>
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
