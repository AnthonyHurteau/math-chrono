import { Grid } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { OperatorParamProps } from "./types";

export default function OperatorParamComponent(props: OperatorParamProps) {
  const {
    value,
    label,
    updateParams,
    operatorKey,
    classes,
    arrayName,
    arrayKey,
    arrayKeyValue,
    arrayValueKey,
    xs,
  } = props;
  return (
    <Grid item xs={xs ?? 6} sm={3}>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value}
            color="primary"
            onClick={() => {
              if (arrayName && arrayKey) {
                updateParams(
                  arrayKey,
                  !value,
                  arrayName,
                  arrayValueKey,
                  arrayKeyValue
                );
              } else if (operatorKey) {
                updateParams(operatorKey, !value);
              }
            }}
          />
        }
        label={label}
        labelPlacement="start"
        sx={classes.sectionPadding}
      />
    </Grid>
  );
}
