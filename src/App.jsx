import React, { useState, useEffect, Suspense, lazy } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import getTheme from "./theme";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import ParamsComponent from "./components/ParamsComponent";
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
import BaseComponent from "./components/BaseComponent";
import MathWrapperComponent from "./components/MathWrapperComponent";

const HowTo = lazy(() => import("./components/HowTo"));

function App() {
  const [themeMode, setThemeMode] = useState(getStorageMode());
  const [params, setParams] = useState(getStorageParams());
  const appliedTheme = createTheme(getTheme(themeMode));

  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("slideIn");

  useEffect(() => {
    if (location !== displayLocation && location.hash === "") {
      setTransistionStage("slideOut");
    }
  }, [location, displayLocation]);

  const handleThemeModeChange = () => {
    setThemeMode((t) => (t === "light" ? "dark" : "light"));
  };

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 600;
  let isLarge = width >= 1200;
  let isXLarge = width >= 1536;

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
              element={<HomeComponent
                isMobile={isMobile}
                key={randomKey(6)} />}
            />
            <Route
              path="/"
              element={<HomeComponent
                isMobile={isMobile}
                key={randomKey(6)} />}
            />
            <Route
              path="params"
              element={
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
              }
            />
            <Route
              path="math"
              element={
                <MathWrapperComponent
                  isMobile={isMobile}
                  params={params} />
              }
            />
            <Route
              path="howto"
              element={
                <BaseComponent
                  component={
                    <Suspense fallback={<CustomLinearProgress />}>
                      <HowTo
                        isMobile={isMobile}
                        isXLarge={isXLarge}
                        themeMode={themeMode}
                      />
                    </Suspense>
                  }
                />
              }
            />
          </Routes>
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

function randomKey(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
