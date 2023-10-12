import { Fragment } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { NumberParamProps } from "./types";

export default function NumberParamComponent(props: NumberParamProps) {
  const {
    classes,
    description,
    value,
    numberKey,
    updateParams,
    min,
    max,
    validateNumber,
  } = props;
  const [t] = useTranslation();

  return (
    <Fragment>
      <Grid item xs={12} sm={10} sx={classes.rowPadding}>
        {description}
      </Grid>
      <Grid item sx={classes.sectionPadding}>
        <TextField
          label={t("params.numberLabel")}
          type="number"
          variant="outlined"
          color="primary"
          value={value}
          onChange={(event) => {
            updateParams(numberKey, +event.target.value);
          }}
          onBlur={(event) => {
            updateParams(
              numberKey,
              validateNumber(+event.target.value, min, max)
            );
          }}
        />
      </Grid>
    </Fragment>
  );
}
