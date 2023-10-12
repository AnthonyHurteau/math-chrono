import { Fragment, useEffect, useState } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import {
  Param,
  Params,
  ParamsProps,
  TablesSelection,
  ValidationMinMax,
} from "./types";
import { SxObj } from "@/theme/types";
import NumberParamComponent from "./NumberParam";
import YesNoParamComponent from "./YesNoParam";
import TablesParamsComponent from "./TablesParam";
import TimerParamsComponent from "./TimerParams";
import MathParamsComponent from "./MathParams";
import NegativeParamsComponent from "./NegativeParams";

export const tablesMaximumMax = 20;
export const tablesMaximumMin = 10;

// Add array keys in this array for initialization of already existing storages
const tablesSelectionArray = [...Array(tablesMaximumMax).keys()].map((i) =>
  i === 5 ? { label: i + 1, value: true } : { label: i + 1, value: false }
);
export const paramsArray: Param[] = [
  { key: "tablesSelection", array: tablesSelectionArray },
];

// !!!!!!! ALWAYS ADD NEW PROPERTIES HERE WHEN ADDING NEW PARAMS !!!!!!
export const initParams: Params = {
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

export let validationMinMax: ValidationMinMax = {
  operandsMin: 2,
  operandsMax: operandsMaxInit,
  amountMin: 1,
  amountMax: 100,
  maximumMin: 1,
  maximumMax,
  tablesMaximumMin,
  tablesMaximumMax,
};

const sxStyles = (isMobile: boolean): SxObj => {
  return {
    sectionPadding: { paddingBottom: "25px" },
    rowPadding: { paddingBottom: "10px" },
    rowTimerMobile: { paddingTop: "5px", paddingBottom: "20px" },
    sliderRow: { height: isMobile ? "40px" : "60px" },
  };
};

export default function ParamsComponent(props: ParamsProps) {
  const { isMobile, params, setParams } = props;
  const [t] = useTranslation();
  const classes = sxStyles(isMobile);
  const [operandsMax, setOperandsMax] = useState(operandsMaxInit);
  const [noTables, setNoTables] = useState(!params.isTables);
  const [yesTables, setYesTables] = useState(params.isTables);

  const updateParams = (
    key1: keyof Params | keyof TablesSelection,
    value: (typeof params)[keyof Params],
    key2: keyof Params | null = null,
    key3: keyof TablesSelection | null = null,
    key1Value: any | null = null
  ) => {
    let paramsObj: Params = { ...params };
    if (key2 && key3) {
      (paramsObj[key2] as any[]).find((x) => x[key1] === key1Value)[key3] =
        value;
    } else {
      (paramsObj[key1 as keyof Params] as (typeof params)[keyof Params]) =
        value;
    }
    setParams(paramsObj);
  };

  const validateAll = () => {
    let paramsObj = { ...params };

    const operands = validateNumber(
      params.operands,
      validationMinMax.operandsMin,
      validationMinMax.operandsMax
    );

    const amount = validateNumber(
      params.amount,
      validationMinMax.amountMin,
      validationMinMax.amountMax
    );

    const maximum = validateNumber(
      params.maximum,
      validationMinMax.maximumMin,
      validationMinMax.maximumMax
    );

    paramsObj.operands = operands;
    paramsObj.amount = amount;
    paramsObj.maximum = maximum;

    setParams(paramsObj);
  };

  function validateNumber(value: number, min: number, max: number) {
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }

    return value;
  }

  useEffect(() => {
    let paramsObj = { ...params };

    if (
      !params.addition &&
      !params.substraction &&
      !params.multiplication &&
      !params.division
    ) {
      paramsObj.addition = true;

      setParams(paramsObj);
    }
  }, [params, setParams]);

  useEffect(() => {
    if (params.isTables) {
      setNoTables(false);
    }
    if (!params.isTables) {
      setYesTables(false);
    }
  }, [params.isTables]);

  useEffect(() => {
    if (params.division) {
      validationMinMax.maximumMax = divisionMaximumMax;
      validationMinMax.operandsMax = divisionOperandsMax;
    } else if (!params.division) {
      validationMinMax.maximumMax = maximumMax;
      validationMinMax.operandsMax = operandsMaxInit;
    }

    setOperandsMax(validationMinMax.operandsMax);
  }, [params.division, params.operands]);

  useEffect(() => {
    let paramsObj = { ...params };

    if (params.operands > operandsMax) {
      paramsObj.operands = operandsMax;

      setParams(paramsObj);
    }
  }, [params, setParams, operandsMax]);

  return (
    <Fragment>
      <span className="chalk-title">{t("params.title")}</span>
      {/* Description */}
      <Grid item xs={12} sm={10} sx={classes.sectionPadding}>
        {t("params.description")}
      </Grid>
      {/* ---- Mode Toggle ---- */}
      <YesNoParamComponent
        description={t("params.tablesToggleDescription")}
        value={params.isTables}
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
        isMobile={isMobile}
        params={params}
        classes={classes}
        updateParams={updateParams}
      />
      {/* ---- Operation amount ---- */}
      <NumberParamComponent
        description={t("params.operationAmount")}
        numberKey={"amount"}
        value={params.amount}
        updateParams={updateParams}
        validateNumber={validateNumber}
        min={validationMinMax.amountMin}
        max={validationMinMax.amountMax}
        classes={classes}
      />
      <Collapse in={params.isTables} timeout={1000}>
        <Fade in={params.isTables} timeout={1000}>
          {/* ---- Tables ---- */}
          <Box>
            <TablesParamsComponent
              params={params}
              setParams={setParams}
              classes={classes}
              updateParams={updateParams}
              validationMinMax={validationMinMax}
            />
          </Box>
        </Fade>
      </Collapse>
      <Collapse in={!params.isTables} timeout={1000}>
        <Fade in={!params.isTables} timeout={1000}>
          {/* ---- Math Params ---- */}
          <Box>
            <MathParamsComponent
              params={params}
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
        params={params}
        isMobile={isMobile}
        updateParams={updateParams}
        classes={classes}
      />
      <Grid item xs={8} sx={{ paddingTop: 5 }}>
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
