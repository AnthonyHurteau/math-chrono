import React, { useState, useEffect, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import getTheme from "./theme";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import ParamsComponent from "./components/ParamsComponent";
import CustomLinearProgress from "./components/SuspenseFallbackComponent";
import {
  getStorageParams,
  setStorageParams,
} from "./components/services/SettingsService";
import {
  getStorageMode,
  setStorageMode,
} from "./components/services/SettingsService";

function App() {
  const [themeMode, setThemeMode] = useState(getStorageMode());
  const [params, setParams] = useState(getStorageParams());
  const appliedTheme = createTheme(getTheme(themeMode));

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
  let isXLarge = width >= 1536;

  useEffect(() => {
    setStorageMode(themeMode);
  }, [themeMode]);

  useEffect(() => {
    setStorageParams(params);
  }, [params]);

  return (
    <Router>
      <ThemeProvider theme={appliedTheme}>
        <Suspense fallback={<CustomLinearProgress />}>
          <CssBaseline />
          <Navbar
            isMobile={isMobile}
            themeMode={themeMode}
            handleThemeModeChange={handleThemeModeChange}
          />

          <Routes>
            <Route
              path="/"
              element={
                <ParamsComponent
                  params={params}
                  setParams={setParams} />
              }
            />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
}

export default App;
