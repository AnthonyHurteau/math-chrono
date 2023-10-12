import React, { ReactNode, useCallback } from "react";
import { Box, Container, Grid, Theme, useTheme } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SxObj } from "@/theme/types";
import { BaseProps } from "./types";
import getTheme from "@/theme/theme";

export const chalkboard = "chalkboard";
export const dashboard = "dashboard";

const sxStyles = (
  theme: Theme,
  isMobile: boolean,
  pxHeight?: string
): SxObj => {
  return {
    baseContainer: {
      padding: "2% calc(2% - 10px) 2% 2%",
      marginTop: "5%",
      height: pxHeight ?? `calc(100vh - ${isMobile ? 90 : 140}px)`,
    },
    chalkboardContainer: {
      padding: "2% calc(2% - 10px) 2% 2%",
      marginTop: "5%",
      height: pxHeight ?? `calc(100vh - ${isMobile ? 90 : 140}px)`,
      background: theme.palette.chalkboard.background,
      backgroundAttachment: "local",
      color: "white",
      border: "solid",
      borderColor: "black",
      borderRadius: `${theme.shape.borderRadius}px`,
      borderImage: `url(wood.png) 200 / 12px`,
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
    dashboardContainer: {
      padding: "2% calc(2% - 10px) 2% 2%",
      height: pxHeight ?? `calc(100vh - ${isMobile ? 90 : 140}px)`,
      marginTop: "0 !important",
    },
  };
};

export default function BaseLayout(props: BaseProps) {
  const { isMobile, isForm, children, componentType, pxHeight } = props;
  const theme = useTheme();
  const classes = sxStyles(theme, isMobile, pxHeight);
  const appliedTheme = createTheme(getTheme("dark"));

  const FormWrapper = useCallback(
    (props: {
      formWrapper: (x: ReactNode) => ReactNode;
      children: ReactNode;
    }) => {
      return isForm ? props.formWrapper(props.children) : props.children;
    },
    [isForm]
  );

  return (
    <ThemeProvider theme={appliedTheme}>
      <Container className="container">
        <Grid container justifyContent="center" alignItems="center">
          {/* Left margin */}
          <Grid item xs={0} sm={2}></Grid>
          {/* Middle content */}
          <Grid item sm={8}>
            <FormWrapper
              formWrapper={(child: React.ReactNode) => <form>{child}</form>}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={
                  componentType === dashboard
                    ? classes.dashboardContainer
                    : classes.chalkboardContainer
                }
              >
                {children}
              </Grid>
            </FormWrapper>
          </Grid>
          {/* Right Margin */}
          <Grid item xs={0} sm={2}></Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
