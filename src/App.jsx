import React, { useState, useEffect, Suspense, lazy } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import getTheme from "./theme";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import HomeComponent from "./components/HomeComponent";
import CustomLinearProgress from "./components/SuspenseFallbackComponent";
import UpdatePwaComponent from "./components/UpdatePwaComponent";
import {
  getStorageParams,
  setStorageParams,
} from "./components/services/SettingsService";
import {
  getStorageMode,
  setStorageMode,
} from "./components/services/SettingsService";

const BaseComponent = lazy(() => import("./components/BaseComponent"));
const ParamsComponent = lazy(() => import("./components/ParamsComponent"));
const MathWrapperComponent = lazy(() =>
  import("./components/MathWrapperComponent")
);
const HowTo = lazy(() => import("./components/HowTo"));

function App() {
  const [themeMode, setThemeMode] = useState(getStorageMode());
  const [params, setParams] = useState(getStorageParams());
  const appliedTheme = createTheme(getTheme(themeMode));

  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("slideIn");

  useEffect(() => {
    if (
      location.pathname !== displayLocation.pathname &&
      location.hash === ""
    ) {
      setTransistionStage("slideOut");
    }
  }, [location, displayLocation]);

  const handleThemeModeChange = () => {
    setThemeMode((t) => (t === "light" ? "dark" : "light"));
  };

  const breakpoints = { mobile: 600, large: 1200, xlarge: 1536 };

  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= breakpoints.mobile);
  const [isLarge, setIsLarge] = useState(width >= breakpoints.large);
  const [isXLarge, setIsXLarge] = useState(width >= breakpoints.xlarge);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (window.screen.width <= breakpoints.mobile) {
      setIsMobile(width <= breakpoints.mobile);
    }
    if (window.screen.width >= breakpoints.large) {
      setIsMobile(width <= breakpoints.mobile);
      setIsLarge(width >= breakpoints.large);
    }
    if (window.screen.width >= breakpoints.xlarge) {
      setIsMobile(width <= breakpoints.mobile);
      setIsLarge(width >= breakpoints.large);
      setIsXLarge(width >= breakpoints.xlarge);
    }
  }, [width, breakpoints.mobile, breakpoints.large, breakpoints.xlarge]);

  useEffect(() => {
    setStorageMode(themeMode);
  }, [themeMode]);

  useEffect(() => {
    setStorageParams(params);
  }, [params]);

  return (
    <ThemeProvider theme={appliedTheme}>
      <Suspense fallback={<CustomLinearProgress />}>
        <CssBaseline />
        <UpdatePwaComponent />
        <Navbar
          isMobile={isMobile}
          isLarge={isLarge}
          themeMode={themeMode}
          handleThemeModeChange={handleThemeModeChange}
        />
        <div
          className={`${transitionStage}`}
          onAnimationEnd={() => {
            if (transitionStage === "slideOut") {
              setTransistionStage("slideIn");
              setDisplayLocation(location);
            }
          }}
        >
          <Routes location={displayLocation}>
            <Route
              path="*"
              element={<HomeComponent isMobile={isMobile} />} />
            <Route
              path="/"
              element={<HomeComponent isMobile={isMobile} />} />
            <Route
              path="params"
              element={
                <Suspense fallback={<CustomLinearProgress />}>
                  <BaseComponent
                    isForm={true}
                    component={
                      <ParamsComponent
                        isMobile={isMobile}
                        params={params}
                        setParams={setParams}
                      />
                    }
                  />
                </Suspense>
              }
            />
            <Route
              path="math"
              element={
                <Suspense fallback={<CustomLinearProgress />}>
                  <MathWrapperComponent
                    isMobile={isMobile}
                    params={params} />
                </Suspense>
              }
            />
            <Route
              path="howto"
              element={
                <Suspense fallback={<CustomLinearProgress />}>
                  <BaseComponent
                    component={
                      <HowTo
                        isMobile={isMobile}
                        isXLarge={isXLarge}
                        themeMode={themeMode}
                      />
                    }
                  />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
