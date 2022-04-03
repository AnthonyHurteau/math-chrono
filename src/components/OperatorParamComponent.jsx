import React from "react";
import { Grid } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function OperatorParamComponent(props) {
  return (
    <Grid
      item
      xs={props.xs ?? 6}
      sm={4}>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!props.value}
            color="primary"
            onClick={() => {
              if (props.arrayName) {
                props.updateParams(
                  props.arrayKey,
                  !props.value,
                  props.arrayName,
                  props.arrayValueKey,
                  props.arrayKeyValue
                );
              } else {
                props.updateParams(props.operatorKey, !props.value);
              }
            }}
          />
        }
        label={props.label}
        labelPlacement="start"
        className={props.classes.sectionPadding}
      />
    </Grid>
  );
}
