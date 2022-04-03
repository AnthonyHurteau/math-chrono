import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import OperatorParamComponent from "./OperatorParamComponent";
import { useTranslation } from "react-i18next";
import NumberParamComponent from "./NumberParamComponent";
import SelectParamComponent from "./SelectParamComponent";

export default function MathParamsComponent(props) {
  const [t] = useTranslation();

  const getOperandsOptions = useCallback(() => {
    return [...Array(props.operandsMax - 1)].map((x, i) => {
      return { value: i + 2, label: i + 2 };
    });
  }, [props.operandsMax]);

  const [operandsOptions, setOperandsOptions] = useState(getOperandsOptions());

  useEffect(() => {
    setOperandsOptions(getOperandsOptions());
  }, [getOperandsOptions]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={props.classes.rowPadding}
    >
      {/* ---- Number of operands ---- */}
      <SelectParamComponent
        description={t("params.math.operandsDescription")}
        selectKey={"operands"}
        label={t("params.numberLabel")}
        value={props.params.operands}
        options={operandsOptions}
        updateParams={props.updateParams}
        classes={props.classes}
      />
      {/* ---- Operators ---- */}
      {/* Operators description */}
      <Grid
        item
        xs={12}
        sm={10}
        className={props.classes.rowPadding}>
        {t("params.math.operators")}
      </Grid>
      {/* Addition */}
      <OperatorParamComponent
        value={props.params.addition}
        label={"+"}
        operatorKey="addition"
        updateParams={props.updateParams}
        classes={props.classes}
      />
      {/* Subsctraction */}
      <OperatorParamComponent
        value={props.params.substraction}
        label={"-"}
        operatorKey="substraction"
        updateParams={props.updateParams}
        classes={props.classes}
      />
      {/* Multiplication */}
      <OperatorParamComponent
        value={props.params.multiplication}
        label={"x"}
        operatorKey="multiplication"
        updateParams={props.updateParams}
        classes={props.classes}
      />
      {/* Division */}
      <OperatorParamComponent
        value={props.params.division}
        label={"÷"}
        operatorKey="division"
        updateParams={props.updateParams}
        classes={props.classes}
      />
      {/* ---- Maximum number ---- */}
      {/* maximum number description */}
      <NumberParamComponent
        description={t("params.math.maximumDescription")}
        numberKey={"maximum"}
        value={props.params.maximum}
        updateParams={props.updateParams}
        validateNumber={props.validateNumber}
        min={props.validationMinMax.maximumMin}
        max={props.validationMinMax.maximumMax}
        classes={props.classes}
      />
    </Grid>
  );
}
