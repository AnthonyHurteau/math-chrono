import HomeComponent from "@/pages/Home/Home";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { RoutingProps } from "./types";
import { Box } from "@mui/material";
import CustomLinearProgress from "@/components/SuspenceFallback";

const BaseComponent = lazy(() => import("@/layout/Base"));
const ParamsComponent = lazy(() => import("@/pages/Params"));
const MathWrapperComponent = lazy(() => import("@/pages/MathWrapper"));
const HowToComponent = lazy(() => import("@/pages/HowTo"));

export default function RoutingComponent(props: RoutingProps) {
  const {
    isMobile,
    isMdPlus,
    isXLarge,
    isHeightLarge,
    themeMode,
    params,
    setParams,
  } = props;
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

  return (
    <Box
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
          element={
            <HomeComponent isMobile={isMobile} isHeightLarge={isHeightLarge} />
          }
        />
        <Route
          path="/"
          element={
            <HomeComponent isMobile={isMobile} isHeightLarge={isHeightLarge} />
          }
        />
        <Route
          path="params"
          element={
            <Suspense fallback={<CustomLinearProgress />}>
              <BaseComponent isMobile={isMobile} isForm={true}>
                <ParamsComponent
                  isMobile={isMobile}
                  params={params}
                  setParams={setParams}
                />
              </BaseComponent>
            </Suspense>
          }
        />
        <Route
          path="math"
          element={
            <Suspense fallback={<CustomLinearProgress />}>
              <MathWrapperComponent
                isMobile={isMobile}
                isMdPlus={isMdPlus}
                params={params}
              />
            </Suspense>
          }
        />
        <Route
          path="howto"
          element={
            <Suspense fallback={<CustomLinearProgress />}>
              <BaseComponent isMobile={isMobile}>
                <HowToComponent
                  isMobile={isMobile}
                  isXLarge={isXLarge}
                  themeMode={themeMode}
                />
              </BaseComponent>
            </Suspense>
          }
        />
      </Routes>
    </Box>
  );
}
