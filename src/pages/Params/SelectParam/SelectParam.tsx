import { Fragment } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectParamProps } from "./types";

export default function SelectParamComponent(props: SelectParamProps) {
  const {
    selectKey,
    label,
    value,
    options,
    updateParams,
    description,
    classes,
  } = props;
  return (
    <Fragment>
      <Grid item xs={12} sm={10} sx={classes.rowPadding}>
        {description}
      </Grid>
      <Grid item xs={12} sm={10} sx={classes.sectionPadding}>
        <FormControl sx={{ width: "176.5px" }}>
          <InputLabel id={`${selectKey}-label`}>{label}</InputLabel>
          <Select
            labelId={`${selectKey}-label`}
            id={`${selectKey}-select`}
            value={value}
            label={label}
            onChange={(event) => {
              updateParams(selectKey, +event.target.value);
            }}
          >
            {options.map((o, i) => {
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
