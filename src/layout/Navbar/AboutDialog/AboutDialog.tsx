import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Link,
  Slide,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AboutDialogProps } from "./types";
import { SxObj } from "@/theme/types";
import { appSettings } from "@/AppSettings";
import { TransitionProps } from "@mui/material/transitions";

const sxStyles = (isMobile: boolean): SxObj => {
  return {
    email: {
      fontSize: isMobile ? "5vw" : null,
    },
  };
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AboutDialogComponent(props: AboutDialogProps) {
  const { isMobile, openAboutDialog, setOpenAboutDialog, themeMode } = props;
  const classes = sxStyles(isMobile);
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
            Version {appSettings.version}
          </Typography>
          <br />
          <p>{t("aboutDialog.text1")}</p>
          <p>{t("aboutDialog.text2")}</p>
          <p>
            <Link
              href="mailto:info@math-chrono.app"
              target="_blank"
              rel="noopener noreferrer"
              sx={classes.email}
            >
              info@math-chrono.app
            </Link>
          </p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleClose}>
            <Typography>Ok</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
