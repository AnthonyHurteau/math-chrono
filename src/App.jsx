import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import getTheme from "./theme";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import {
  getStorageMode,
  setStorageMode,
} from "./components/services/SettingsService";

function App() {
  const [themeMode, setThemeMode] = useState(getStorageMode());
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

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Navbar
        isMobile={isMobile}
        themeMode={themeMode}
        handleThemeModeChange={handleThemeModeChange}
      />
    </ThemeProvider>
  );
}

export default App;
