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

export default function TimerParamsComponent({
  isMobile,
  params,
  classes,
  updateParams,
}) {
  const [t] = useTranslation();

  return (
    <Fragment>
      {/* Timer Description */}
      <Grid
        item
        xs={12}
        sm={10}
        className={classes.rowPadding}>
        {t("params.timer.description")}
      </Grid>
      {/* Timer toggle */}
      <Grid
        item
        xs={12}
        sm={6}
        className={isMobile ? null : classes.sectionPadding}
      >
        <FormControlLabel
          className={classes.sliderRow}
          control={
            <Switch
              color="primary"
              checked={!!params.isTime}
              onClick={() => {
                updateParams("isTime", !params.isTime);
              }}
            />
          }
          label={t("params.timer.toggle")}
          labelPlacement="start"
        />
      </Grid>
      {/* Timer with if  */}
      <Collapse
        in={params.isTime}
        timeout={1000}
        orientation={isMobile ? "vertical" : "horizontal"}
        sx={{ width: isMobile ? "100%" : "50%" }}
      >
        <Grid
          item
          className={classes.rowTimerMobile}>
          <Fade
            in={params.isTime}
            timeout={1000}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  ampm={false}
                  views={["hours", "minutes", "seconds"]}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  label={t("params.timer.label")}
                  value={params.time}
                  onChange={(newTime) => {
                    updateParams("time", newTime);
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
