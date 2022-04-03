import React, { Fragment } from "react";
import {
  Box,
  Grid,
  FormControlLabel,
  Switch,
  Collapse,
  Fade,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function TimerParamsComponent(props) {
  const [t] = useTranslation();

  return (
    <Fragment>
      {/* Timer Description */}
      <Grid
        item
        xs={12}
        sm={10}
        className={props.classes.rowPadding}>
        {t("params.timer.description")}
      </Grid>
      {/* Timer toggle */}
      <Grid
        item
        xs={12}
        sm={6}
        className={props.isMobile ? null : props.classes.sectionPadding}
      >
        <FormControlLabel
          className={props.classes.sliderRow}
          control={
            <Switch
              color="primary"
              checked={!!props.params.isTime}
              onClick={() => {
                props.updateParams("isTime", !props.params.isTime);
              }}
            />
          }
          label={t("params.timer.toggle")}
          labelPlacement="start"
        />
      </Grid>
      {/* Timer with if  */}
      <Collapse
        in={props.params.isTime}
        timeout={1000}
        orientation={props.isMobile ? "vertical" : "horizontal"}
        sx={{ width: props.isMobile ? "100%" : "50%" }}
      >
        <Grid
          item
          className={props.classes.rowTimerMobile}>
          <Fade
            in={props.params.isTime}
            timeout={1000}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  ampm={false}
                  views={["hours", "minutes", "seconds"]}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  label={t("params.timer.label")}
                  value={props.params.time}
                  onChange={(newTime) => {
                    props.updateParams("time", newTime);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Fade>
        </Grid>
      </Collapse>
    </Fragment>
  );
}
