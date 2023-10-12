import { Fragment } from "react";
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
import { TimerParamsProps } from "./type";
// import { TimePicker } from "@mui/lab";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { parseISO } from "date-fns";

export default function TimerParamsComponent(props: TimerParamsProps) {
  const { params, updateParams, classes, isMobile } = props;
  const [t] = useTranslation();

  return (
    <Fragment>
      {/* Timer Description */}
      <Grid item xs={12} sm={10} sx={classes.rowPadding}>
        {t("params.timer.description")}
      </Grid>
      {/* Timer toggle */}
      <Grid item xs={12} sm={6} sx={isMobile ? null : classes.sectionPadding}>
        <FormControlLabel
          sx={classes.sliderRow}
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
        <Grid item sx={classes.rowTimerMobile}>
          <Fade in={params.isTime} timeout={1000}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  ampm={false}
                  views={["hours", "minutes", "seconds"]}
                  label={t("params.timer.label")}
                  value={new Date(params.time)}
                  onChange={(newTime) => updateParams("time", newTime!)}
                />
              </LocalizationProvider>
            </Box>
          </Fade>
        </Grid>
      </Collapse>
    </Fragment>
  );
}
