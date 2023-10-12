import { useState, useEffect, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@/app.css";
import { CssBaseline } from "@mui/material";
import Navbar from "@/layout/Navbar";
import SW from "@/layout/SW";
import {
  getStorageMode,
  getStorageParams,
  setStorageMode,
  setStorageParams,
} from "@/services/SettingsService";
import getTheme from "./theme/theme";
import CustomLinearProgress from "./components/SuspenceFallback/SuspenceFallback";
import RoutingComponent from "./routes/Routing";
import { withErrorHandler } from "./error-handling";
import AppErrorBoundaryFallback from "./error-handling/fallbacks/App";
import { SnackbarProvider } from "notistack";

function App() {
  const [themeMode, setThemeMode] = useState(getStorageMode());
  const [params, setParams] = useState(getStorageParams());
  const appliedTheme = createTheme(getTheme(themeMode));

  const handleThemeModeChange = () => {
    setThemeMode((t) => (t === "light" ? "dark" : "light"));
  };

  const breakpoints = { mobile: 600, mdPlus: 1000, large: 1200, xlarge: 1536 };

  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= breakpoints.mobile);
  const [isMdPlus, setIsMdPlus] = useState(width >= breakpoints.mdPlus);
  const [isLarge, setIsLarge] = useState(width >= breakpoints.large);
  const [isXLarge, setIsXLarge] = useState(width >= breakpoints.xlarge);

  const heightBreakpoints = { large: 800 };
  const [height, setHeight] = useState(window.innerHeight);
  const [isHeightLarge, setIsHeightLarge] = useState(
    height >= heightBreakpoints.large
  );

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
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
    if (window.screen.width <= breakpoints.mdPlus) {
      setIsMobile(width <= breakpoints.mobile);
      setIsMdPlus(width >= breakpoints.mdPlus);
    }
    if (window.screen.width >= breakpoints.large) {
      setIsMobile(width <= breakpoints.mobile);
      setIsMdPlus(width >= breakpoints.mdPlus);
      setIsLarge(width >= breakpoints.large);
    }
    if (window.screen.width >= breakpoints.xlarge) {
      setIsMobile(width <= breakpoints.mobile);
      setIsMdPlus(width >= breakpoints.mdPlus);
      setIsLarge(width >= breakpoints.large);
      setIsXLarge(width >= breakpoints.xlarge);
    }

    setIsHeightLarge(height >= heightBreakpoints.large);
  }, [
    width,
    height,
    breakpoints.mobile,
    breakpoints.mdPlus,
    breakpoints.large,
    breakpoints.xlarge,
    heightBreakpoints.large,
  ]);

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
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        />
        <SW />
        <Navbar
          isMobile={isMobile}
          isLarge={isLarge}
          themeMode={themeMode}
          handleThemeModeChange={handleThemeModeChange}
        />
        <RoutingComponent
          isMobile={isMobile}
          isMdPlus={isMdPlus}
          isXLarge={isXLarge}
          isHeightLarge={isHeightLarge}
          themeMode={themeMode}
          params={params}
          setParams={setParams}
        />
      </Suspense>
    </ThemeProvider>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
