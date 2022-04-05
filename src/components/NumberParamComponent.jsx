import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";

export default function NumberParamComponent({
  description,
  numberKey,
  value,
  updateParams,
  validateNumber,
  min,
  max,
  classes,
}) {
  const [t] = useTranslation();

  return (
    <Fragment>
      <Grid
        item
        xs={12}
        sm={10}
        className={classes.rowPadding}>
        {description}
      </Grid>
      <Grid
        item
        className={classes.sectionPadding}>
        <TextField
          label={t("params.numberLabel")}
          type="number"
          variant="outlined"
          color="primary"
          value={value}
          onChange={(event) => {
            updateParams(numberKey, event.target.value);
          }}
          onBlur={(event) => {
            updateParams(
              numberKey,
              validateNumber(event.target.value, min, max)
            );
          }}
        />
      </Grid>
    </Fragment>
  );
}
