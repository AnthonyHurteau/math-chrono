import React, { Fragment, useEffect, useState } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import NumberParamComponent from "./NumberParamComponent";
import YesNoParamComponent from "./YesNoParamComponent";
import Collapse from "@mui/material/Collapse";
import TablesParamsComponent from "./TablesParamsComponent";
import TimerParamsComponent from "./TimerParamsComponent";
import MathParamsComponent from "./MathParamsComponent";
import NegativeParamsComponent from "./NegativeParamsComponent";

const tablesMaximumMax = 20;

// Add array keys in this array for initialization of already existing storages
const tablesSelectionArray = [...Array(tablesMaximumMax).keys()].map(
  (i) =>
    (i = 5 ? { label: i + 1, value: true } : { label: i + 1, value: false })
);
export const paramsArray = [
  { key: "tablesSelection", array: tablesSelectionArray },
];

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
  isTables: false,
  tablesMultiplication: true,
  tablesDivision: false,
  tablesMaximum: 12,
  tablesSelection: tablesSelectionArray,
  negativeNumbers: false,
  negativeButtonMobile: false,
};

export const operandsMaxInit = 5;
export const maximumMax = 9999;

export const divisionOperandsMax = 3;
export const divisionMaximumMax = 99;

export let validationMinMax = {
  operandsMin: 2,
  operandsMax: operandsMaxInit,
  amountMin: 1,
  amountMax: 100,
  maximumMin: 1,
  maximumMax,
  tablesMaximumMin: 10,
  tablesMaximumMax,
};

const useStyles = makeStyles((theme) => ({
  sectionPadding: { paddingBottom: 25 },
  rowPadding: { paddingBottom: 10 },
  rowTimerMobile: { paddingTop: 5, paddingBottom: 20 },
  sliderRow: (props) => ({ height: props.isMobile ? "40px" : "60px" }),
}));

export default function ParamsComponent(props) {
  const [t] = useTranslation();
  const classes = useStyles(props);
  const [operandsMax, setOperandsMax] = useState(operandsMaxInit);
  const [noTables, setNoTables] = useState(!props.params.isTables);
  const [yesTables, setYesTables] = useState(props.params.isTables);

  const updateParams = (
    key1,
    value,
    key2 = null,
    key3 = null,
    key1Value = null
  ) => {
    let params = { ...props.params };
    if (key2) {
      params[key2].find((x) => x[key1] === key1Value)[key3] = value;
    } else {
      params[key1] = value;
    }
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
    if (props.params.isTables) {
      setNoTables(false);
    }
    if (!props.params.isTables) {
      setYesTables(false);
    }
  }, [props.params.isTables]);

  useEffect(() => {
    if (props.params.division) {
      validationMinMax.maximumMax = divisionMaximumMax;
      validationMinMax.operandsMax = divisionOperandsMax;
    } else if (!props.params.division) {
      validationMinMax.maximumMax = maximumMax;
      validationMinMax.operandsMax = operandsMaxInit;
    }

    setOperandsMax(validationMinMax.operandsMax);
  }, [props.params.division, props.params.operands]);

  useEffect(() => {
    if (props.params.operands > operandsMax) {
      let params = { ...props.params };
      params.operands = operandsMax;

      props.setParams(params);
    }
  }, [operandsMax, props]);

  return (
    <Fragment>
      <span className="chalk-title">{t("params.title")}</span>
      {/* Description */}
      <Grid
        item
        xs={12}
        sm={10}
        className={classes.sectionPadding}>
        {t("params.description")}
      </Grid>
      {/* ---- Mode Toggle ---- */}
      <YesNoParamComponent
        description={t("params.tablesToggleDescription")}
        value={props.params.isTables}
        yesNoKey={"isTables"}
        updateParams={updateParams}
        label={t("params.tables.toggle")}
        toggleTrue={yesTables}
        setToggleTrue={setYesTables}
        toggleFalse={noTables}
        setToggleFalse={setNoTables}
        yesLabel={t("params.tablesLabel")}
        noLabel={t("params.mathLabel")}
        classes={classes}
      />
      {/* ---- Timer ---- */}
      <TimerParamsComponent
        params={props.params}
        classes={classes}
        updateParams={updateParams}
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
      <Collapse
        in={props.params.isTables}
        timeout={1000}>
        <Fade
          in={props.params.isTables}
          timeout={1000}>
          {/* ---- Tables ---- */}
          <Box>
            <TablesParamsComponent
              params={props.params}
              setParams={props.setParams}
              classes={classes}
              updateParams={updateParams}
              validationMinMax={validationMinMax}
            />
          </Box>
        </Fade>
      </Collapse>
      <Collapse
        in={!props.params.isTables}
        timeout={1000}>
        <Fade
          in={!props.params.isTables}
          timeout={1000}>
          {/* ---- Math Params ---- */}
          <Box>
            <MathParamsComponent
              params={props.params}
              operandsMax={operandsMax}
              updateParams={updateParams}
              validateNumber={validateNumber}
              classes={classes}
              validationMinMax={validationMinMax}
            />
          </Box>
        </Fade>
      </Collapse>
      {/* ---- Negative Numbers ---- */}
      <NegativeParamsComponent
        params={props.params}
        isMobile={props.isMobile}
        updateParams={updateParams}
        classes={classes}
      />
      <Grid
        item
        xs={8}
        sx={{ paddingTop: 5 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            validateAll();
          }}
          component={Link}
          to={"/math"}
        >
          <Typography
            sx={{
              fontSize: "22px",
            }}
          >
            {t("params.submit")}
          </Typography>
        </Button>
      </Grid>
    </Fragment>
  );
}
