import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import OperatorParamComponent from "./OperatorParamComponent";
import { useTranslation } from "react-i18next";
import NumberParamComponent from "./NumberParamComponent";
import SelectParamComponent from "./SelectParamComponent";

export default function MathParamsComponent({
  params,
  operandsMax,
  updateParams,
  validateNumber,
  classes,
  validationMinMax,
}) {
  const [t] = useTranslation();

  const getOperandsOptions = useCallback(() => {
    return [...Array(operandsMax - 1)].map((x, i) => {
      return { value: i + 2, label: i + 2 };
    });
  }, [operandsMax]);

  const [operandsOptions, setOperandsOptions] = useState(getOperandsOptions());

  useEffect(() => {
    setOperandsOptions(getOperandsOptions());
  }, [getOperandsOptions]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.rowPadding}
    >
      {/* ---- Number of operands ---- */}
      <SelectParamComponent
        description={t("params.math.operandsDescription")}
        selectKey={"operands"}
        label={t("params.numberLabel")}
        value={params.operands}
        options={operandsOptions}
        updateParams={updateParams}
        classes={classes}
      />
      {/* ---- Operators ---- */}
      {/* Operators description */}
      <Grid
        item
        xs={12}
        sm={10}
        className={classes.rowPadding}>
        {t("params.math.operators")}
      </Grid>
      {/* Addition */}
      <OperatorParamComponent
        value={params.addition}
        label={"+"}
        operatorKey="addition"
        updateParams={updateParams}
        classes={classes}
      />
      {/* Subsctraction */}
      <OperatorParamComponent
        value={params.substraction}
        label={"-"}
        operatorKey="substraction"
        updateParams={updateParams}
        classes={classes}
      />
      {/* Multiplication */}
      <OperatorParamComponent
        value={params.multiplication}
        label={"x"}
        operatorKey="multiplication"
        updateParams={updateParams}
        classes={classes}
      />
      {/* Division */}
      <OperatorParamComponent
        value={params.division}
        label={"÷"}
        operatorKey="division"
        updateParams={updateParams}
        classes={classes}
      />
      {/* ---- Maximum number ---- */}
      {/* maximum number description */}
      <NumberParamComponent
        description={t("params.math.maximumDescription")}
        numberKey={"maximum"}
        value={params.maximum}
        updateParams={updateParams}
        validateNumber={validateNumber}
        min={validationMinMax.maximumMin}
        max={validationMinMax.maximumMax}
        classes={classes}
      />
    </Grid>
  );
}
