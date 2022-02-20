import React, { useState, useRef, useEffect } from "react";
import { Grid, TextField, Box } from "@mui/material";
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import Fab from "@mui/material/Fab";

const useStyles = makeStyles((theme) => ({
  operation: { paddingBottom: "15px", display: "flex", alignItems: "baseline" },
  answerBox: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    transition: "2s",
    padding: "5px",
  },
  rightAnswer: {
    backgroundColor: alpha(theme.palette.success.main, 0.3),
  },
  wrongAnswer: {
    backgroundColor: alpha(theme.palette.error.main, 0.3),
  },
  textFieldBox: {
    width: "90px",
    flex: "0 0 auto",
  },
  negativeFab: {
    position: "absolute",
    right: "10px",
    bottom: "60px",
  },
}));

export default function OperationsComponent(props) {
  const classes = useStyles();
  const [t] = useTranslation();
  const [focusIndex, setFocusIndex] = useState(0);
  const operationRefs = useRef([]);

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      setFocusIndex(focusIndex + 1);
      event.preventDefault();
    }
  };

  function negativeNumber() {
    const ref = operationRefs.current[focusIndex];
    const currentValue = ref.value;
    ref.value = currentValue ? currentValue * -1 : -1;
    ref.focus();
  }

  return (
    <form>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        className={classes.rowPadding}
      >
        {props.operations.map((o, i) => (
          <Grid
            item
            key={"operation-" + i}
            className={classes.operation}>
            <Box
              className={
                props.end
                  ? o.isRightAnswer
                    ? classes.answerBox + " " + classes.rightAnswer
                    : classes.answerBox + " " + classes.wrongAnswer
                  : classes.answerBox
              }
            >
              <Box>{o.operationText}</Box>
              <Box>&nbsp;=&nbsp;</Box>
              <Box className={classes.textFieldBox}>
                <TextField
                  id={"input-" + i}
                  label={t("params.numberLabel")}
                  disabled={props.timeLeft === 0 || props.end}
                  type="number"
                  variant="outlined"
                  color="primary"
                  inputRef={(input) => {
                    operationRefs.current[i] = input;
                    if (input && focusIndex === i) {
                      input.focus();
                    }
                  }}
                  onKeyPress={(event) => {
                    handleEnter(event);
                  }}
                  onFocus={() => {
                    setFocusIndex(i);
                  }}
                  onChange={(event) => {
                    props.operationAnswer(event.target.value, o.id);
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
        {props.params.negativeNumbers &&
        props.params.negativeButtonMobile &&
        props.isMobile ? (
            <Box className={classes.negativeFab}>
              <Fab
                color="secondary"
                aria-label="negative"
                sx={{ fontSize: "48px", fontWeight: "bold" }}
                onClick={() => negativeNumber()}
              >
              -
              </Fab>
            </Box>
          ) : null}
      </Grid>
    </form>
  );
}
