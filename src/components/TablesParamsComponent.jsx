import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import OperatorParamComponent from "./OperatorParamComponent";
import { useTranslation } from "react-i18next";
import SelectParamComponent from "./SelectParamComponent";

export default function TablesParamsComponent(props) {
  const [t] = useTranslation();

  const tablesMaximumOptions = [
    ...Array(
      props.validationMinMax.tablesMaximumMax -
        props.validationMinMax.tablesMaximumMin +
        1
    ),
  ].map((x, i) => {
    return {
      value: i + props.validationMinMax.tablesMaximumMin,
      label: i + props.validationMinMax.tablesMaximumMin,
    };
  });

  useEffect(() => {
    let params = { ...props.params };

    if (!props.params.tablesMultiplication && !props.params.tablesDivision) {
      params.tablesMultiplication = true;
      props.setParams(params);
    }

    if (
      !props.params.tablesSelection.find(
        (t) => t.value && t.label <= props.params.tablesMaximum
      )
    ) {
      props.params.tablesSelection.find((t) => t.label === 1).value = true;
      props.setParams(params);
    }
  }, [props]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={props.classes.rowPadding}
    >
      {/* Tables Operator Description */}
      <Grid
        item
        xs={12}
        sm={10}
        className={props.classes.rowPadding}>
        {t("params.tables.operators")}
      </Grid>
      {/* Multiplication */}
      <OperatorParamComponent
        value={props.params.tablesMultiplication}
        label={"x"}
        operatorKey="tablesMultiplication"
        updateParams={props.updateParams}
        classes={props.classes}
      />
      {/* Division */}
      <OperatorParamComponent
        value={props.params.tablesDivision}
        label={"÷"}
        operatorKey="tablesDivision"
        updateParams={props.updateParams}
        classes={props.classes}
      />
      {/* ---- Tables Maximum ---- */}
      <SelectParamComponent
        description={t("params.tables.tablesMaximum")}
        selectKey={"tablesMaximum"}
        label={t("params.numberLabel")}
        value={props.params.tablesMaximum}
        options={tablesMaximumOptions}
        updateParams={props.updateParams}
        classes={props.classes}
      />
      {/* Tables Selection Description */}
      <Grid
        item
        xs={12}
        sm={10}
        className={props.classes.sectionPadding}>
        {t("params.tables.selectionDescription")}
      </Grid>
      {[...Array(props.params.tablesMaximum)].map((x, i) => (
        <OperatorParamComponent
          key={`tables-${i + 1}`}
          value={
            props.params.tablesSelection.find((t) => t.label === i + 1).value
          }
          label={i + 1}
          arrayKey={"label"}
          arrayKeyValue={i + 1}
          arrayValueKey={"value"}
          arrayName={"tablesSelection"}
          updateParams={props.updateParams}
          classes={props.classes}
          xs={4}
        />
      ))}
    </Grid>
  );
}
