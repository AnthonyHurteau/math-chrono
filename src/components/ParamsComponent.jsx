import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import NumberParamComponent from "./NumberParamComponent";
import OperatorParamComponent from "./OperatorParamComponent";
import YesNoParamComponent from "./YesNoParamComponent";
import Collapse from "@mui/material/Collapse";

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
  negativeButtonMobile: false,
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
  const [yesNegativeNumbers, setYesNegativeNumbers] = useState(
    props.params.negativeNumbers
  );
  const [noNegativeButton, setNoNegativeButton] = useState(
    !props.params.negativeButtonMobile
  );
  const [yesNegativeButton, setYesNegativeButton] = useState(
    props.params.negativeButtonMobile
  );

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
              <NumberParamComponent
                description={t("params.operandsDescription")}
                numberKey={"operands"}
                value={props.params.operands}
                updateParams={updateParams}
                validateNumber={validateNumber}
                min={validationMinMax.operandsMin}
                max={validationMinMax.operandsMax}
                classes={classes}
              />
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
              <OperatorParamComponent
                value={props.params.addition}
                label={"+"}
                operatorKey="addition"
                updateParams={updateParams}
                classes={classes}
              />
              {/* Subsctraction */}
              <OperatorParamComponent
                value={props.params.substraction}
                label={"-"}
                operatorKey="substraction"
                updateParams={updateParams}
                classes={classes}
              />
              {/* Multiplication */}
              <OperatorParamComponent
                value={props.params.multiplication}
                label={"x"}
                operatorKey="multiplication"
                updateParams={updateParams}
                classes={classes}
              />
              {/* Division */}
              <OperatorParamComponent
                value={props.params.division}
                label={"÷"}
                operatorKey="division"
                updateParams={updateParams}
                classes={classes}
              />
              {/* ---- Operation amount ---- */}
              <NumberParamComponent
                description={t("params.operationAmount")}
                numberKey={"amount"}
                value={props.params.amount}
                updateParams={updateParams}
                validateNumber={validateNumber}
                min={validationMinMax.amountMin}
                max={validationMinMax.amountMax}
                classes={classes}
              />
              {/* ---- Maximum number ---- */}
              {/* maximum number description */}
              <NumberParamComponent
                description={t("params.maximumDescription")}
                numberKey={"maximum"}
                value={props.params.maximum}
                updateParams={updateParams}
                validateNumber={validateNumber}
                min={validationMinMax.maximumMin}
                max={validationMinMax.maximumMax}
                classes={classes}
              />
              {/* ---- Negative numbers ---- */}
              <YesNoParamComponent
                description={t("params.negativeNumbersDescription")}
                value={props.params.negativeNumbers}
                yesNoKey={"negativeNumbers"}
                updateParams={updateParams}
                label={t("params.negativeNumbers")}
                toggleTrue={yesNegativeNumbers}
                setToggleTrue={setYesNegativeNumbers}
                toggleFalse={noNegativeNumbers}
                setToggleFalse={setNoNegativeNumbers}
                classes={classes}
              />
              {/* ---- Mobile Negative Number Button---- */}
              <Collapse
                in={props.isMobile && props.params.negativeNumbers}
                timeout={1000}
              >
                {" "}
                <Box sx={{ paddingTop: "25px" }}>
                  <YesNoParamComponent
                    description={t("params.negativeButtonMobileDescription")}
                    value={props.params.negativeButtonMobile}
                    yesNoKey={"negativeButtonMobile"}
                    updateParams={updateParams}
                    label={t("params.negativeButtonMobile")}
                    toggleTrue={yesNegativeButton}
                    setToggleTrue={setYesNegativeButton}
                    toggleFalse={noNegativeButton}
                    setToggleFalse={setNoNegativeButton}
                    classes={classes}
                  />
                </Box>
              </Collapse>
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
