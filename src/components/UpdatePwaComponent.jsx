import React, { useEffect, useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import * as serviceWorker from "../serviceWorkerRegistration";

export default function UpdatePwaComponent(props) {
  const [t] = useTranslation();
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  const onSWUpdate = useCallback(
    (registration) => {
      setShowReload(true);
      setWaitingWorker(registration.waiting);
    },
    [setWaitingWorker]
  );

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, [onSWUpdate]);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload(true);
  };

  return (
    <Snackbar
      open={showReload}
      message={t("update.message")}
      onClick={reloadPage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      action={
        <Button
          color="primary"
          size="small"
          onClick={reloadPage}>
          {t("update.reload")}
        </Button>
      }
    />
  );
}
