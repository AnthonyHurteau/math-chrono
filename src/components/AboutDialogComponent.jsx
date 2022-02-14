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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide
    direction="up"
    ref={ref}
    {...props} />;
});

export default function AboutDialogComponent(props) {
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
            color="secondary"
            sx={{ fontSize: "36px" }}>
            {t("aboutDialog.title")}
          </Typography>
          <br />
          <Typography color="secondary">
            Version {AppSettings.version}
          </Typography>
          <br />
          <p>{t("aboutDialog.text1")}</p>
          <p>{t("aboutDialog.text2")}</p>
          <p>
            <a
              href="mailto:nhl.tools.app@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              hurteau.anthony123@gmail.com
            </a>
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}>
            <Typography>Ok</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
