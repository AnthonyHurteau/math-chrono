import { Fragment, useCallback, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { enqueueSnackbar } from "notistack";
import { useRegisterSW } from "virtual:pwa-register/react";
import { useTranslation } from "react-i18next";

// TODO (Suren): this should be a custom hook :)
function SW() {
  const [t] = useTranslation();
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, [setOfflineReady, setNeedRefresh]);

  useEffect(() => {
    if (offlineReady) {
      const message = t("update.offline");
      const options = {
        autoHideDuration: 4500,
      };
      enqueueSnackbar<"info">(message, options);
    } else if (needRefresh) {
      const message = t("update.message");
      const options = {
        persist: true,
        action: (
          <Fragment>
            <Button onClick={() => updateServiceWorker(true)}>
              {t("update.reload")}
            </Button>
            <Button onClick={close}>{t("update.close")}</Button>
          </Fragment>
        ),
      };
      enqueueSnackbar<"info">(message, options);
    }
  }, [close, needRefresh, offlineReady, updateServiceWorker]);

  return null;
}

export default SW;
