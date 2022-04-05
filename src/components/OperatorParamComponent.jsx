import React from "react";
import { Grid } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function OperatorParamComponent({
  value,
  label,
  operatorKey,
  updateParams,
  classes,
  arrayName,
  arrayKey,
  arrayValueKey,
  arrayKeyValue,
  xs,
}) {
  return (
    <Grid
      item
      xs={xs ?? 6}
      sm={3}>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value}
            color="primary"
            onClick={() => {
              if (arrayName) {
                updateParams(
                  arrayKey,
                  !value,
                  arrayName,
                  arrayValueKey,
                  arrayKeyValue
                );
              } else {
                updateParams(operatorKey, !value);
              }
            }}
          />
        }
        label={label}
        labelPlacement="start"
        className={classes.sectionPadding}
      />
    </Grid>
  );
}
