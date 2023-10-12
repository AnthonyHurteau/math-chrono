import {
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashRef = () => {
  let location = useLocation();
  const lastHash = useRef("");

  let hashElement = useMemo(() => {
    let hash = location.hash;

    if (hash) {
      return hash.slice(1);
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      lastHash.current = hashElement;

      if (lastHash.current && document.getElementById(lastHash.current)) {
        setTimeout(() => {
          document
            .getElementById(lastHash.current)
            ?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          lastHash.current = "";
        }, 100);
      }
    }
  }, [hashElement]);

  return null;
};

export default ScrollToHashRef;
