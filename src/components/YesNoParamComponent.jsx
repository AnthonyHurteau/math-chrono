import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fade from "@mui/material/Fade";

export default function YesNoParamComponent(props) {
  const [t] = useTranslation();
  const transitionTime = 500;

  return (
    <Fragment>
      <Grid
        item
        xs={12}
        sm={10}
        className={props.classes.rowPadding}>
        {props.description}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        className={props.classes.sliderRow}>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={!!props.value}
              onClick={() => {
                props.updateParams(props.yesNoKey, !props.value);
              }}
            />
          }
          label={props.label}
          labelPlacement="start"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        className={props.classes.sliderRow}
        sx={{
          paddingTop: "6px",
        }}
      >
        <Fade
          in={props.toggleTrue}
          timeout={transitionTime}
          onExited={() =>
            props.value ? props.setToggleTrue(true) : props.setToggleFalse(true)
          }
          unmountOnExit
        >
          <div>{props.yesLabel ?? t("params.yes")}</div>
        </Fade>
        <Fade
          in={props.toggleFalse}
          timeout={transitionTime}
          onExited={() =>
            props.value ? props.setToggleTrue(true) : props.setToggleFalse(true)
          }
          unmountOnExit
        >
          <div>{props.noLabel ?? t("params.no")}</div>
        </Fade>
      </Grid>
    </Fragment>
  );
}
