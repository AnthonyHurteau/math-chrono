import { initParams, paramsArray } from "@/pages/Params/Params";
import { Params } from "@/pages/Params/types";
import { ThemeMode } from "@/theme/types";

const mode = "mode";
const params = "params";

export function getStorageMode() {
  if (!get(mode)) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      set(mode, "dark");
    } else {
      set(mode, "light");
    }
  }

  return get(mode) as ThemeMode;
}

export function setStorageMode(val: ThemeMode) {
  set(mode, val);
}

export function getStorageParams() {
  if (!get(params)) {
    set(params, JSON.stringify(initParams));
  }

  const parsedParams = JSON.parse(get(params) as string);
  // Add new properties for already installed apps
  for (const key in initParams) {
    if (parsedParams[key] === null || parsedParams[key] === undefined) {
      parsedParams[key] = initParams[key as keyof Params];
    }
  }

  // Add new arrays for already installed apps
  for (const paramArray of paramsArray) {
    if (parsedParams[paramArray.key]) {
      parsedParams[paramArray.key] =
        parsedParams[paramArray.key].length !== paramArray.array.length
          ? paramArray.array
          : parsedParams[paramArray.key];
    }
  }

  return parsedParams as Params;
}

export function setStorageParams(val: Params) {
  if (get(params)) {
    set(params, JSON.stringify(val));
  }
}

const get = (key: string) => {
  return localStorage.getItem(key);
};

const set = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};
