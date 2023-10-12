import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TablesMaximumOptions, TablesParamProps } from "./types";
import OperatorParamComponent from "../OperatorParam";
import SelectParamComponent from "../SelectParam";

export default function TablesParamsComponent(props: TablesParamProps) {
  const { params, setParams, updateParams, classes, validationMinMax } = props;
  const [t] = useTranslation();

  const tablesMaximumOptions: TablesMaximumOptions[] = [
    ...Array(
      validationMinMax.tablesMaximumMax - validationMinMax.tablesMaximumMin + 1
    ),
  ].map((x, i) => {
    return {
      value: i + validationMinMax.tablesMaximumMin,
      label: i + validationMinMax.tablesMaximumMin,
    };
  });

  useEffect(() => {
    let paramsObj = { ...params };

    if (!params.tablesMultiplication && !params.tablesDivision) {
      paramsObj.tablesMultiplication = true;
      setParams(paramsObj);
    }

    if (
      !params.tablesSelection.find(
        (t) => t.value && t.label <= params.tablesMaximum
      )
    ) {
      paramsObj.tablesSelection.find((t) => t.label === 1)!.value = true;
      setParams(paramsObj);
    }
  }, [params, setParams]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={classes.rowPadding}
    >
      {/* Tables Operator Description */}
      <Grid item xs={12} sm={10} sx={classes.rowPadding}>
        {t("params.tables.operators")}
      </Grid>
      {/* Multiplication */}
      <OperatorParamComponent
        value={params.tablesMultiplication}
        label={"x"}
        operatorKey="tablesMultiplication"
        updateParams={updateParams}
        classes={classes}
      />
      {/* Division */}
      <OperatorParamComponent
        value={params.tablesDivision}
        label={"÷"}
        operatorKey="tablesDivision"
        updateParams={updateParams}
        classes={classes}
      />
      {/* ---- Tables Maximum ---- */}
      <SelectParamComponent
        description={t("params.tables.tablesMaximum")}
        selectKey={"tablesMaximum"}
        label={t("params.numberLabel")}
        value={params.tablesMaximum}
        options={tablesMaximumOptions}
        updateParams={updateParams}
        classes={classes}
      />
      {/* Tables Selection Description */}
      <Grid item xs={12} sm={10} sx={classes.sectionPadding}>
        {t("params.tables.selectionDescription")}
      </Grid>
      {[...Array(params.tablesMaximum)].map((x, i) => (
        <OperatorParamComponent
          key={`tables-${i + 1}`}
          value={params.tablesSelection.find((t) => t.label === i + 1)!.value}
          label={i + 1}
          arrayKey={"label"}
          arrayKeyValue={i + 1}
          arrayValueKey={"value"}
          arrayName={"tablesSelection"}
          updateParams={updateParams}
          classes={classes}
          xs={4}
        />
      ))}
    </Grid>
  );
}
