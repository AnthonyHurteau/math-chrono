import React, { Fragment } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SelectParamComponent(props) {
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
        xs={12}
        sm={10}
        className={props.classes.sectionPadding}>
        <FormControl sx={{ width: "176.5px" }}>
          <InputLabel id={`${props.selectKey}-label`}>{props.label}</InputLabel>
          <Select
            labelId={`${props.selectKey}-label`}
            id={`${props.selectKey}-select`}
            value={props.value}
            label={props.label}
            onChange={(event) => {
              props.updateParams(props.selectKey, event.target.value);
            }}
          >
            {props.options.map((o, i) => {
              return (
                <MenuItem
                  key={"menuItem-" + i}
                  value={o.value}
                  sx={{ justifyContent: "center" }}
                >
                  {o.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </Fragment>
  );
}
