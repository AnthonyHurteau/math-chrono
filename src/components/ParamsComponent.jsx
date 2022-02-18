import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";

// !!!!!!! ALWAYS ADD NEW PROPERTIES HERE WHEN ADDING NEW PARAMS !!!!!!
export const initParams = {
  isTime: true,
  time: new Date(0, 0, 1, 0, 10),
  operands: 2,
  addition: true,
  substraction: true,
  multiplication: true,
  division: true,
  amount: 20,
  maximum: 20,
  negativeNumbers: false,
};

const operandsMax = 5;
const maximumMax = 9999;

const divisionOperandsMax = 3;
const divisionMaximumMax = 99;

let validationMinMax = {
  operandsMin: 2,
  operandsMax,
  amountMin: 1,
  amountMax: 100,
  maximumMin: 1,
  maximumMax,
};

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    border: "1px solid",
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.primary.main,
    padding: "2%",
    marginTop: "5%",
    marginBottom: "2%",
    height: "85vh",
    overflow: "auto",
  },
  sectionPadding: { paddingBottom: 25 },
  rowPadding: { paddingBottom: 10 },
  sliderRow: (props) => ({ height: props.isMobile ? "40px" : "60px" }),
}));

export default function ParamsComponent(props) {
  const [t] = useTranslation();
  const classes = useStyles(props);
  const [noNegativeNumbers, setNoNegativeNumbers] = useState(
    !props.params.negativeNumbers
  );
  const [yesNegativeNumbers, setyesNegativeNumbers] = useState(
    props.params.negativeNumbers
  );
  const negativeNumbersYesNoTransitionTime = 500;

  const updateParams = (key, value) => {
    let params = { ...props.params };
    params[key] = value;
    props.setParams(params);
  };

  const validateAll = () => {
    let params = { ...props.params };

    const operands = validateNumber(
      props.params.operands,
      validationMinMax.operandsMin,
      validationMinMax.operandsMax
    );

    const amount = validateNumber(
      props.params.amount,
      validationMinMax.amountMin,
      validationMinMax.amountMax
    );

    const maximum = validateNumber(
      props.params.maximum,
      validationMinMax.maximumMin,
      validationMinMax.maximumMax
    );

    params.operands = operands;
    params.amount = amount;
    params.maximum = maximum;

    props.setParams(params);
  };

  function validateNumber(value, min, max) {
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }

    return value;
  }

  useEffect(() => {
    if (
      !props.params.addition &&
      !props.params.substraction &&
      !props.params.multiplication &&
      !props.params.division
    ) {
      let params = { ...props.params };
      params.addition = true;

      props.setParams(params);
    }
  }, [props]);

  useEffect(() => {
    if (props.params.negativeNumbers) {
      setNoNegativeNumbers(false);
    }
    if (!props.params.negativeNumbers) {
      setyesNegativeNumbers(false);
    }
  }, [props.params.negativeNumbers]);

  useEffect(() => {
    if (props.params.division) {
      validationMinMax.maximumMax = divisionMaximumMax;
      validationMinMax.operandsMax = divisionOperandsMax;
    } else if (!props.params.division) {
      validationMinMax.maximumMax = maximumMax;
      validationMinMax.operandsMax = operandsMax;
    }
  }, [props.params.division]);

  return (
    <Container className="container">
      <Grid
        container
        justifyContent="center"
        alignItems="center">
        {/* Left margin */}
        <Grid
          item
          xs={0}
          sm={2}></Grid>
        {/* Middle content */}
        <Grid
          item
          sm={8}>
          <form>
            <Grid
              container
              className={classes.gridContainer}
              justifyContent="center"
              alignItems="center"
            >
              <span className="chalk-title">{t("params.title")}</span>
              {/* Description */}
              <Grid
                item
                xs={12}
                sm={10}
                className={classes.sectionPadding}>
                {t("params.description")}
              </Grid>
              {/* ---- TIMER ---- */}
              {/* Timer Description */}
              <Grid
                item
                xs={12}
                sm={10}
                className={classes.rowPadding}>
                {t("params.timeDescription")}
              </Grid>
              {/* Timer toggle */}
              <Grid
                item
                sm={6}
                className={classes.sectionPadding}>
                <FormControlLabel
                  className={classes.sliderRow}
                  control={
                    <Switch
                      color="primary"
                      checked={!!props.params.isTime}
                      onClick={() => {
                        updateParams("isTime", !props.params.isTime);
                      }}
                    />
                  }
                  label={t("params.timepickerToggle")}
                  labelPlacement="start"
                />
              </Grid>
              {/* Timer with if  */}
              <Grid
                item
                sm={6}
                className={classes.sectionPadding}>
                <Fade
                  in={props.params.isTime}
                  timeout={1000}>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        ampm={false}
                        views={["hours", "minutes", "seconds"]}
                        inputFormat="HH:mm:ss"
                        mask="__:__:__"
                        label={t("params.timepickerLabel")}
                        value={props.params.time}
                        onChange={(newTime) => {
                          updateParams("time", newTime);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </Fade>
              </Grid>
              {/* ---- Number of operands ---- */}
              {/* Number of opeprands description */}
              <Grid
                item
                xs={12}
                sm={10}
                className={classes.rowPadding}>
                {t("params.operandsDescription")}
              </Grid>
              {/* Number of operation */}
              <Grid
                item
                className={classes.sectionPadding}>
                <TextField
                  label={t("params.numberLabel")}
                  type="number"
                  variant="outlined"
                  color="primary"
                  value={props.params.operands}
                  onChange={(event) => {
                    updateParams("operands", event.target.value);
                  }}
                  onBlur={(event) => {
                    updateParams(
                      "operands",
                      validateNumber(
                        event.target.value,
                        validationMinMax.operandsMin,
                        validationMinMax.operandsMax
                      )
                    );
                  }}
                />
              </Grid>
              {/* ---- Operators ---- */}
              {/* Operators description */}
              <Grid
                item
                xs={12}
                sm={10}
                className={classes.rowPadding}>
                {t("params.operators")}
              </Grid>
              {/* Addition */}
              <Grid
                item
                sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.params.addition}
                      color="primary"
                      onClick={() => {
                        updateParams("addition", !props.params.addition);
                      }}
                    />
                  }
                  label="+"
                  labelPlacement="start"
                  className={classes.sectionPadding}
                  sx={{ marginLeft: 0 }}
                />
              </Grid>
              {/* Subsctraction */}
              <Grid
                item
                sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!props.params.substraction}
                      color="primary"
                      onClick={() => {
                        updateParams(
                          "substraction",
                          !props.params.substraction
                        );
                      }}
                    />
                  }
                  label="-"
                  labelPlacement="start"
                  className={classes.sectionPadding}
                />
              </Grid>
              {/* Multiplication */}
              <Grid
                item
                sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!props.params.multiplication}
                      color="primary"
                      onClick={() => {
                        updateParams(
                          "multiplication",
                          !props.params.multiplication
                        );
                      }}
                    />
                  }
                  label="x"
                  labelPlacement="start"
                  className={classes.sectionPadding}
                />
              </Grid>
              {/* Division */}
              <Grid
                item
                sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!props.params.division}
                      color="primary"
                      onClick={() => {
                        updateParams("division", !props.params.division);
                      }}
                    />
                  }
                  label="÷"
                  labelPlacement="start"
                  className={classes.sectionPadding}
                />
              </Grid>
              {/* ---- Operation amount ---- */}
              {/* Amount description */}
              <Grid
                item
                xs={12}
                sm={10}
                className={classes.rowPadding}>
                {t("params.operationAmount")}
              </Grid>
              {/* Amount */}
              <Grid
                item
                className={classes.sectionPadding}>
                <TextField
                  label={t("params.numberLabel")}
                  type="number"
                  variant="outlined"
                  color="primary"
                  value={props.params.amount}
                  onChange={(event) => {
                    updateParams("amount", event.target.value);
                  }}
                  onBlur={(event) => {
                    updateParams(
                      "amount",
                      validateNumber(
                        event.target.value,
                        validationMinMax.amountMin,
                        validationMinMax.amountMax
                      )
                    );
                  }}
                />
              </Grid>
              {/* ---- Maximum number ---- */}
              {/* maximum number description */}
              <Grid
                item
                xs={12}
                sm={10}
                className={classes.rowPadding}>
                {t("params.maximumDescription")}
              </Grid>
              {/* maximum number */}
              <Grid
                item
                className={classes.sectionPadding}>
                <TextField
                  label={t("params.numberLabel")}
                  type="number"
                  variant="outlined"
                  color="primary"
                  value={props.params.maximum}
                  onChange={(event) => {
                    updateParams("maximum", event.target.value);
                  }}
                  onBlur={(event) => {
                    updateParams(
                      "maximum",
                      validateNumber(
                        event.target.value,
                        validationMinMax.maximumMin,
                        validationMinMax.maximumMax
                      )
                    );
                  }}
                />
              </Grid>
              {/* ---- Negative numbers ---- */}
              {/* Negative numbers  description */}
              <Grid
                item
                xs={12}
                sm={10}
                className={classes.rowPadding}>
                {t("params.negativeNumbersDescription")}
              </Grid>
              {/* Negative numbers  */}
              <Grid
                item
                xs={12}
                sm={6}
                className={classes.sliderRow}>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={!!props.params.negativeNumbers}
                      onClick={() => {
                        updateParams(
                          "negativeNumbers",
                          !props.params.negativeNumbers
                        );
                      }}
                    />
                  }
                  label={t("params.negativeNumbers")}
                  labelPlacement="start"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                className={classes.sliderRow}
                sx={{
                  paddingTop: "6px",
                }}
              >
                <Fade
                  in={yesNegativeNumbers}
                  timeout={negativeNumbersYesNoTransitionTime}
                  onExited={() =>
                    props.params.negativeNumbers
                      ? setyesNegativeNumbers(true)
                      : setNoNegativeNumbers(true)
                  }
                  unmountOnExit
                >
                  <div>{t("params.negativeNumbersYes")}</div>
                </Fade>
                <Fade
                  in={noNegativeNumbers}
                  timeout={negativeNumbersYesNoTransitionTime}
                  onExited={() =>
                    props.params.negativeNumbers
                      ? setyesNegativeNumbers(true)
                      : setNoNegativeNumbers(true)
                  }
                  unmountOnExit
                >
                  <div>{t("params.negativeNumbersNo")}</div>
                </Fade>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ paddingTop: 5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    validateAll();
                  }}
                  component={Link}
                  to={"math"}
                >
                  <Typography
                    sx={{
                      fontFamily: "Fredericka the Great",
                      fontSize: "22px",
                    }}
                  >
                    {t("params.submit")}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        {/* Right Margin */}
        <Grid
          item
          xs={0}
          sm={2}></Grid>
      </Grid>
    </Container>
  );
}
