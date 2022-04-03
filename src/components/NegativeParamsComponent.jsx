import React, { Fragment, useState, useEffect } from "react";
import { Box, Collapse, Fade } from "@mui/material";
import { useTranslation } from "react-i18next";
import YesNoParamComponent from "./YesNoParamComponent";

export default function NegativeParamsComponent(props) {
  const [t] = useTranslation();
  const [noNegativeNumbers, setNoNegativeNumbers] = useState(
    !props.params.negativeNumbers
  );
  const [yesNegativeNumbers, setYesNegativeNumbers] = useState(
    props.params.negativeNumbers
  );
  const [noNegativeButton, setNoNegativeButton] = useState(
    !props.params.negativeButtonMobile
  );
  const [yesNegativeButton, setYesNegativeButton] = useState(
    props.params.negativeButtonMobile
  );

  useEffect(() => {
    if (props.params.negativeNumbers) {
      setNoNegativeNumbers(false);
    }
    if (!props.params.negativeNumbers) {
      setYesNegativeNumbers(false);
    }
  }, [props.params.negativeNumbers]);

  useEffect(() => {
    if (props.params.negativeButtonMobile) {
      setNoNegativeButton(false);
    }
    if (!props.params.negativeButtonMobile) {
      setYesNegativeButton(false);
    }
  }, [props.params.negativeButtonMobile]);

  return (
    <Fragment>
      {/* ---- Negative numbers ---- */}
      <YesNoParamComponent
        description={t("params.negativeNumbers.description")}
        value={props.params.negativeNumbers}
        yesNoKey={"negativeNumbers"}
        updateParams={props.updateParams}
        label={t("params.negativeNumbers.label")}
        toggleTrue={yesNegativeNumbers}
        setToggleTrue={setYesNegativeNumbers}
        toggleFalse={noNegativeNumbers}
        setToggleFalse={setNoNegativeNumbers}
        classes={props.classes}
      />
      {/* ---- Mobile Negative Number Button---- */}
      <Collapse
        in={props.isMobile && props.params.negativeNumbers}
        timeout={1000}
      >
        <Fade
          in={props.isMobile && props.params.negativeNumbers}
          timeout={1000}
        >
          <Box sx={{ paddingTop: "25px" }}>
            <YesNoParamComponent
              description={t("params.negativeNumbers.mobileButtonDescription")}
              value={props.params.negativeButtonMobile}
              yesNoKey={"negativeButtonMobile"}
              updateParams={props.updateParams}
              label={t("params.negativeNumbers.mobileButtonLabel")}
              toggleTrue={yesNegativeButton}
              setToggleTrue={setYesNegativeButton}
              toggleFalse={noNegativeButton}
              setToggleFalse={setNoNegativeButton}
              classes={props.classes}
            />
          </Box>
        </Fade>
      </Collapse>
    </Fragment>
  );
}
