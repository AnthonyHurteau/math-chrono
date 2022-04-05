import React, { useCallback } from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getTheme from "../theme";

export const chalkboard = "chalkboard";
export const dashboard = "dashboard";

const useStyles = makeStyles((theme) => ({
  baseContainer: ({ isMobile, pxHeight }) => ({
    padding: "2% calc(2% - 10px) 2% 2%",
    marginTop: "5%",
    height: pxHeight ?? `calc(100vh - ${isMobile ? 90 : 140}px)`,
  }),
  chalkboardContainer: {
    background: theme.palette.chalkboard.background,
    backgroundAttachment: "local",
    color: "white",
    border: "solid",
    borderColor: "black",
    borderRadius: theme.shape.borderRadius,
    borderImage: `url(${process.env.PUBLIC_URL}/wood.png) 200 / 12px`,
    borderImageOutset: "8px",
    overflow: "auto",
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.7)",
    transition: "0.5s",
    "&:hover": {
      boxShadow: "0 12px 24px 0 rgba(0,0,0,0.7)",
    },
    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
      background: theme.palette.chalkboard.background,
    },
    "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
      background: theme.palette.chalkboard.background,
    },
  },
  dashboardContainer: { marginTop: "0 !important" },
}));

export default function BaseComponent({
  isMobile,
  isForm,
  component,
  componentType,
  pxHeight,
}) {
  const classes = useStyles({ isMobile, pxHeight });
  const appliedTheme = createTheme(getTheme("dark"));

  const FormWrapper = useCallback(
    (props) => {
      return isForm ? props.formWrapper(props.children) : props.children;
    },
    [isForm]
  );

  return (
    <ThemeProvider theme={appliedTheme}>
      <Container className="container">
        <Grid
          container
          justifyContent="center"
          alignItems="center">
          {/* Left margin */}
          <Grid
            item
            xs={0}
            sm={2}></Grid>
          {/* Middle content */}
          <Grid
            item
            sm={8}>
            <FormWrapper formWrapper={(children) => <form>{children}</form>}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                className={`${classes.baseContainer} ${
                  componentType === dashboard
                    ? classes.dashboardContainer
                    : classes.chalkboardContainer
                }`}
              >
                {component}
              </Grid>
            </FormWrapper>
          </Grid>
          {/* Right Margin */}
          <Grid
            item
            xs={0}
            sm={2}></Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
