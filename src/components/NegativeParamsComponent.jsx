import React, { Fragment, useState, useEffect } from "react";
import { Box, Collapse, Fade } from "@mui/material";
import { useTranslation } from "react-i18next";
import YesNoParamComponent from "./YesNoParamComponent";

export default function NegativeParamsComponent({
  params,
  isMobile,
  updateParams,
  classes,
}) {
  const [t] = useTranslation();
  const [noNegativeNumbers, setNoNegativeNumbers] = useState(
    !params.negativeNumbers
  );
  const [yesNegativeNumbers, setYesNegativeNumbers] = useState(
    params.negativeNumbers
  );
  const [noNegativeButton, setNoNegativeButton] = useState(
    !params.negativeButtonMobile
  );
  const [yesNegativeButton, setYesNegativeButton] = useState(
    params.negativeButtonMobile
  );

  useEffect(() => {
    if (params.negativeNumbers) {
      setNoNegativeNumbers(false);
    }
    if (!params.negativeNumbers) {
      setYesNegativeNumbers(false);
    }
  }, [params.negativeNumbers]);

  useEffect(() => {
    if (params.negativeButtonMobile) {
      setNoNegativeButton(false);
    }
    if (!params.negativeButtonMobile) {
      setYesNegativeButton(false);
    }
  }, [params.negativeButtonMobile]);

  return (
    <Fragment>
      {/* ---- Negative numbers ---- */}
      <YesNoParamComponent
        description={t("params.negativeNumbers.description")}
        value={params.negativeNumbers}
        yesNoKey={"negativeNumbers"}
        updateParams={updateParams}
        label={t("params.negativeNumbers.label")}
        toggleTrue={yesNegativeNumbers}
        setToggleTrue={setYesNegativeNumbers}
        toggleFalse={noNegativeNumbers}
        setToggleFalse={setNoNegativeNumbers}
        classes={classes}
      />
      {/* ---- Mobile Negative Number Button---- */}
      <Collapse
        in={isMobile && params.negativeNumbers}
        timeout={1000}>
        <Fade
          in={isMobile && params.negativeNumbers}
          timeout={1000}>
          <Box sx={{ paddingTop: "25px" }}>
            <YesNoParamComponent
              description={t("params.negativeNumbers.mobileButtonDescription")}
              value={params.negativeButtonMobile}
              yesNoKey={"negativeButtonMobile"}
              updateParams={updateParams}
              label={t("params.negativeNumbers.mobileButtonLabel")}
              toggleTrue={yesNegativeButton}
              setToggleTrue={setYesNegativeButton}
              toggleFalse={noNegativeButton}
              setToggleFalse={setNoNegativeButton}
              classes={classes}
            />
          </Box>
        </Fade>
      </Collapse>
    </Fragment>
  );
}
