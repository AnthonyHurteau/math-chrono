import React, { Fragment } from "react";
import { Container, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getTheme from "../theme";
import DashboardComponent from "./DashboardComponent";
import BaseComponent from "./components/BaseComponent";
import MathComponent from "./components/MathComponent";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   // background: theme.palette.chalkboard.background,
  //   // backgroundSize: theme.palette.chalkboard.size,
  //   // backgroundAttachment: "local",
  //   // color: "white",
  //   // border: "solid",
  //   // borderColor: "black",
  //   // borderRadius: theme.shape.borderRadius,
  //   // borderImage: `url(${process.env.PUBLIC_URL}/wood.png) 200 / 12px`,
  //   // borderImageOutset: "8px",
  //   padding: "2% calc(2% - 10px) 2% 2%",
  //   marginTop: "5%",
  //   marginBottom: "2%",
  //   height: "85vh",
  //   // overflow: "auto",
  //   // boxShadow: "0 8px 16px 0 rgba(0,0,0,0.7)",
  //   // transition: "0.5s",
  //   // "&:hover": {
  //   //   boxShadow: "0 12px 24px 0 rgba(0,0,0,0.7)",
  //   // },
  //   // "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
  //   //   background: theme.palette.chalkboard.background,
  //   // },
  // },
}));

export default function MathWrapperComponent(props) {
  // const classes = useStyles(props);
  // const isForm = props.isForm;
  // const appliedTheme = createTheme(getTheme("dark"));

  return (
    <Fragment>
      <DashboardComponent
        params={props.params}
        operations={operations}
        start={start}
        countdonwnStart={countdonwnStart}
        setCountdownStart={setCountdownStart}
        countdownEnded={countdownEnded}
        timeLimit={timeLimit}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        setOpenCompletedDialog={setOpenCompletedDialog}
        end={end}
        setEnd={setEnd}
        progress={progress}
        isMobile={props.isMobile}
      />
      <BaseComponent
        component={
          <MathComponent
            isMobile={props.isMobile}
            params={props.params} />
        }
      />
    </Fragment>
  );
}
