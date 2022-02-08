import React, { useEffect, useState } from "react";
import { Container, Grid, useTheme, Typography, Button } from "@mui/material";
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

const validationMinMax = {
  operandsMin: 2,
  operandsMax: 10,
  amountMin: 1,
  amountMax: 500,
  maximumMin: 1,
  maximumMax: 999999999,
};

export default function ParamsComponent(props) {
  const [t] = useTranslation();
  const theme = useTheme();
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

  function validateAll() {
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
  }

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
      setTimeout(() => {
        setyesNegativeNumbers(true);
      }, negativeNumbersYesNoTransitionTime);
    }
    if (!props.params.negativeNumbers) {
      setyesNegativeNumbers(false);
      setTimeout(() => {
        setNoNegativeNumbers(true);
      }, negativeNumbersYesNoTransitionTime);
    }
  }, [props.params.negativeNumbers]);

  return (
    <Container className="container">
      <br />
      <span className="chalk-title">{t("params.title")}</span>
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              border: "1px solid",
              borderRadius: theme.shape.borderRadius,
              borderColor: theme.palette.secondary.main,
              padding: 5,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            {/* Description */}
            <Grid
              item
              xs={12}
              sm={10}
              sx={{ paddingBottom: 5 }}>
              {t("params.description")}
            </Grid>
            {/* ---- TIMER ---- */}
            {/* Timer Description */}
            <Grid
              item
              xs={12}
              sm={10}
              sx={{ paddingBottom: 2 }}>
              {t("params.timeDescription")}
            </Grid>
            {/* Timer toggle */}
            <Grid
              item
              sm={6}
              sx={{ paddingBottom: 5 }}>
              <FormControlLabel
                sx={{ height: "60px" }}
                control={
                  <Switch
                    color="secondary"
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
              sx={{ paddingBottom: 5 }}>
              <Fade
                in={props.params.isTime}
                timeout={1000}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      ampm={false}
                      views={["minutes", "seconds"]}
                      inputFormat="mm:ss"
                      mask="__:__"
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
              sx={{ paddingBottom: 2 }}>
              {t("params.operandsDescription")}
            </Grid>
            {/* Number of operation */}
            <Grid item>
              <TextField
                label={t("params.numberLabel")}
                type="number"
                variant="standard"
                color="secondary"
                sx={{ paddingBottom: 5 }}
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
              sx={{ paddingBottom: 2 }}>
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
                    color="secondary"
                    onClick={() => {
                      updateParams("addition", !props.params.addition);
                    }}
                  />
                }
                label="+"
                labelPlacement="start"
                sx={{ paddingBottom: 5, marginLeft: 0 }}
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
                    color="secondary"
                    onClick={() => {
                      updateParams("substraction", !props.params.substraction);
                    }}
                  />
                }
                label="-"
                labelPlacement="start"
                sx={{ paddingBottom: 5 }}
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
                    color="secondary"
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
                sx={{ paddingBottom: 5 }}
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
                    color="secondary"
                    onClick={() => {
                      updateParams("division", !props.params.division);
                    }}
                  />
                }
                label="÷"
                labelPlacement="start"
                sx={{ paddingBottom: 5 }}
              />
            </Grid>
            {/* ---- Operation amount ---- */}
            {/* Amount description */}
            <Grid
              item
              xs={12}
              sm={10}
              sx={{ paddingBottom: 2 }}>
              {t("params.operationAmount")}
            </Grid>
            {/* Amount */}
            <Grid item>
              <TextField
                label={t("params.numberLabel")}
                type="number"
                variant="standard"
                color="secondary"
                sx={{ paddingBottom: 5 }}
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
              sx={{ paddingBottom: 2 }}>
              {t("params.maximumDescription")}
            </Grid>
            {/* maximum number */}
            <Grid item>
              <TextField
                label={t("params.numberLabel")}
                type="number"
                variant="standard"
                color="secondary"
                sx={{ paddingBottom: 5 }}
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
              sx={{ paddingBottom: 2 }}>
              {t("params.negativeNumbersDescription")}
            </Grid>
            {/* Negative numbers  */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ height: props.isMobile ? "40px" : "60px" }}
            >
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
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
              sx={{
                height: props.isMobile ? "40px" : "60px",
                paddingTop: "6px",
              }}
            >
              <Fade
                in={yesNegativeNumbers}
                timeout={negativeNumbersYesNoTransitionTime}
                unmountOnExit
              >
                <div>{t("params.negativeNumbersYes")}</div>
              </Fade>
              <Fade
                in={noNegativeNumbers}
                timeout={negativeNumbersYesNoTransitionTime}
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
                color="secondary"
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
        </Grid>
        <Grid
          item
          xs={0}
          sm={2}></Grid>
      </Grid>
    </Container>
  );
}
