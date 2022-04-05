import React, { useState, useRef } from "react";
import { Grid, TextField, Box } from "@mui/material";
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import { useTheme } from "@emotion/react";

const useStyles = makeStyles((theme) => ({
  operation: { paddingBottom: "15px", display: "flex", alignItems: "baseline" },
  answerBox: {
    position: "relative",
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
  answerFabContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  negativeFab: {
    position: "absolute",
    right: "10px",
    bottom: "60px",
  },
}));

export default function OperationsComponent({
  operations,
  operationAnswer,
  timeLeft,
  end,
  params,
  isMobile,
  openCompletedDialog,
}) {
  const classes = useStyles();
  const theme = useTheme();
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
    ref.value = currentValue ? Number(currentValue * -1) : Number(-1);
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
        {operations.map((o, i) => (
          <Grid
            item
            key={"operation-" + i}
            className={classes.operation}>
            <Box
              className={
                !openCompletedDialog && end
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
                  disabled={timeLeft === 0 || end}
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
                  onFocus={(event) => {
                    setFocusIndex(i);
                    operationAnswer(event.target.value, i);
                  }}
                  onChange={(event) => {
                    operationAnswer(event.target.value, i);
                  }}
                />
              </Box>
              <Fade
                in={!openCompletedDialog && end && !o.isRightAnswer}
                timeout={1000}
              >
                <Box className={classes.answerFabContainer}>
                  <Fab
                    variant="extended"
                    sx={{ backgroundColor: theme.palette.success.main }}
                    size="small"
                    aria-label="answer"
                  >
                    {o.rightAnswer}
                  </Fab>
                </Box>
              </Fade>
            </Box>
          </Grid>
        ))}
        <Fade
          in={
            params.negativeNumbers &&
            params.negativeButtonMobile &&
            isMobile &&
            !(timeLeft === 0 || end)
          }
          timeout={1000}
        >
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
        </Fade>
      </Grid>
    </form>
  );
}
