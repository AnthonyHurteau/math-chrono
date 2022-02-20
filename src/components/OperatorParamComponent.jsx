import React from "react";
import { Grid } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function OperatorParamComponent(props) {
  return (
    <Grid
      item
      sm={3}>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!props.value}
            color="primary"
            onClick={() => {
              props.updateParams(props.operatorKey, !props.value);
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
