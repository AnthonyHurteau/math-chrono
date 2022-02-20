import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";

export default function NumberParamComponent(props) {
  const [t] = useTranslation();

  return (
    <Fragment>
      <Grid
        item
        xs={12}
        sm={10}
        className={props.classes.rowPadding}>
        {props.description}
      </Grid>
      <Grid
        item
        className={props.classes.sectionPadding}>
        <TextField
          label={t("params.numberLabel")}
          type="number"
          variant="outlined"
          color="primary"
          value={props.value}
          onChange={(event) => {
            props.updateParams(props.numberKey, event.target.value);
          }}
          onBlur={(event) => {
            props.updateParams(
              props.numberKey,
              props.validateNumber(event.target.value, props.min, props.max)
            );
          }}
        />
      </Grid>
    </Fragment>
  );
}
