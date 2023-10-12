import { Fragment } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fade from "@mui/material/Fade";
import { YesNoParamProps } from "./types";

export default function YesNoParamComponent(props: YesNoParamProps) {
  const {
    description,
    yesNoKey,
    value,
    updateParams,
    label,
    yesLabel,
    noLabel,
    toggleTrue,
    toggleFalse,
    setToggleTrue,
    setToggleFalse,
    classes,
  } = props;
  const [t] = useTranslation();
  const transitionTime = 500;

  return (
    <Fragment>
      <Grid item xs={12} sm={10} sx={classes.rowPadding}>
        {description}
      </Grid>
      <Grid item xs={12} sm={6} sx={classes.sliderRow}>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={!!value}
              onClick={() => {
                updateParams(yesNoKey, !value);
              }}
            />
          }
          label={label}
          labelPlacement="start"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ ...classes.sliderRow, ...{ paddingTop: "6px" } }}
      >
        <Fade
          in={toggleTrue}
          timeout={transitionTime}
          onExited={() => (value ? setToggleTrue(true) : setToggleFalse(true))}
          unmountOnExit
        >
          <div>{yesLabel ?? t("params.yes")}</div>
        </Fade>
        <Fade
          in={toggleFalse}
          timeout={transitionTime}
          onExited={() => (value ? setToggleTrue(true) : setToggleFalse(true))}
          unmountOnExit
        >
          <div>{noLabel ?? t("params.no")}</div>
        </Fade>
      </Grid>
    </Fragment>
  );
}
