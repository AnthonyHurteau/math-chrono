import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Container, Fade } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Zoom from "@mui/material/Zoom";
import Slide from "@mui/material/Slide";
import { SxObj } from "@/theme/types";
import { HomeProps } from "./types";

const keyframes = {
  tilt: {
    "@keyframes tilt": {
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(10deg)",
      },
    },
  },
  shake: {
    "@keyframes shake": {
      "0%": { transform: "translate(0,0)" },
      "10%": {
        transform: `translate(-${getRandomInt(2, 8)}px,${getRandomInt(
          2,
          8
        )}px)`,
      },
      "20%": {
        transform: `translate(${getRandomInt(2, 8)}px,-${getRandomInt(
          2,
          8
        )}px)`,
      },
      "30%": {
        transform: `translate(-${getRandomInt(2, 8)}px,${getRandomInt(
          2,
          8
        )}px)`,
      },
      "40%": {
        transform: `translate(${getRandomInt(2, 8)}px,-${getRandomInt(
          2,
          8
        )}px)`,
      },
      "50%": {
        transform: `translate(-${getRandomInt(2, 8)}px,${getRandomInt(
          2,
          8
        )}px)`,
      },
      "60%": {
        transform: `translate(${getRandomInt(2, 8)}px,-${getRandomInt(
          2,
          8
        )}px)`,
      },
      "70%": {
        transform: `translate(-${getRandomInt(2, 8)}px,${getRandomInt(
          2,
          8
        )}px)`,
      },
      "80%": {
        transform: `translate(${getRandomInt(2, 8)}px,-${getRandomInt(
          2,
          8
        )}px)`,
      },
      "90%": {
        transform: `translate(-${getRandomInt(2, 8)}px,${getRandomInt(
          2,
          8
        )}px)`,
      },
      "100%": { transform: "translate(0,0)" },
    },
  },
  slideleft: {
    "@keyframes slideLeft": {
      from: {
        transform: "translateX(110%) scale(0, 0)",
      },
      to: {
        transform: "translateX(0) scale(1, 1)",
      },
    },
  },
  brake: {
    "@keyframes brake": {
      "0%": {
        transform: "translateX(-100%) rotate(0deg)",
      },
      "10%": {
        transform: "translateX(-80%) rotate(0deg)",
      },
      "20%": {
        transform: "translateX(-60%) rotate(-1deg)",
      },
      "30%": {
        transform: "translateX(-40%) rotate(-2deg)",
      },
      "40%": {
        transform: "translateX(-20%) rotate(-3deg)",
      },
      "50%": {
        transform: "translateX(0) rotate(-5deg)",
      },
      "60%": {
        transform: "translateX(10%) rotate(-10deg)",
      },
      "70%": {
        transform: "translateX(5%) rotate(-5deg)",
      },
      "80%": {
        transform: "translateX(0) rotate(0deg)",
      },
      "90%": {
        transform: "translateX(-2%) rotate(-3deg)",
      },
      "95%": {
        transform: "translateX(-1%) rotate(0deg)",
      },
      "100%": {
        transform: "translateX(0) rotate(-2deg)",
      },
    },
  },
};

const sxStyles = (isMobile: boolean, isHeightLarge: boolean): SxObj => {
  return {
    title: {
      position: "relative",
      top: "10px",
      zIndex: 1,
      animationName: "shake, tilt",
      animationTimingFunction: "ease, ease-in",
      animationDuration: "0.5s, 0.5s",
      animationDelay: "2200ms, 4800ms",
      transformOrigin: "top left",
      animationFillMode: "forwards, forwards",
      fontSize: isMobile || !isHeightLarge ? "50px" : "72px",
      ...keyframes.shake,
      ...keyframes.tilt,
    },
    text: {
      fontSize: isMobile || !isHeightLarge ? "32px" : "50px",
    },
    logoShake: {
      animation: "shake 0.5s ease",
      animationDelay: "1400ms",
      transformOrigin: "50% 50%",
      ...keyframes.shake,
    },
    slideText: {
      animation: "slideLeft 0.6s ease-in",
      transformOrigin: "left",
      ...keyframes.slideleft,
    },
    quickText: {
      animation: "brake 0.75s linear",
      transformOrigin: "50% 50%",
      ...keyframes.brake
    },
  };
};

export default function HomeComponent(props: HomeProps) {
  const { isMobile, isHeightLarge } = props;
  const classes = sxStyles(isMobile, isHeightLarge);
  const [t] = useTranslation();
  const [titleSlide, setTitleSlide] = useState(false);
  const [logoZoom, setLogoZoom] = useState(false);
  const [text1Slide, setText1Slide] = useState(false);
  const [text2Slide, setText2Slide] = useState(false);
  const [buttonFade, setButtonFade] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTitleSlide(true);
    }, 2000);

    setTimeout(() => {
      setLogoZoom(true);
    }, 1000);

    setTimeout(() => {
      setText1Slide(true);
    }, 3000);

    setTimeout(() => {
      setText2Slide(true);
    }, 4000);

    setTimeout(() => {
      setButtonFade(true);
    }, 5500);
  }, []);

  return (
    <Container className="container">
      <Grid container>
        {/* Left margin */}
        <Grid item xs={0} sm={1}></Grid>
        <Grid item xs={12} sm={10}>
          <Slide in={titleSlide} direction="down">
            <Typography sx={classes.title}>Math-Chrono</Typography>
          </Slide>
          <Box
            sx={{
              position: "relative",
              top: isMobile ? "30px" : isHeightLarge ? "75px" : "85px",
            }}
          >
            <Zoom in={logoZoom} timeout={500}>
              <Box sx={classes.logoShake}>
                <img
                  height={"200px"}
                  width={"200px"}
                  src={"/logo512.png"}
                  alt="Logo"
                />
              </Box>
            </Zoom>
            {text1Slide ? (
              <Box sx={classes.slideText}>
                <Typography sx={classes.text}>{t("home.text1")}</Typography>
              </Box>
            ) : null}
            {text2Slide ? (
              <Box sx={classes.quickText}>
                <Typography sx={classes.text}>{t("home.text2")}</Typography>
              </Box>
            ) : null}
            <Box sx={{ marginTop: "25px" }}>
              <Fade in={buttonFade} timeout={3500}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={"/params"}
                >
                  <Typography
                    sx={{
                      fontSize: "22px",
                    }}
                  >
                    {t("home.start")}
                  </Typography>
                </Button>
              </Fade>
            </Box>
          </Box>
        </Grid>
        {/* Right margin */}
        <Grid item xs={0} sm={1}></Grid>
      </Grid>
    </Container>
  );
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
