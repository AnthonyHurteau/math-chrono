import { paramsArray, initParams } from "../ParamsComponent";

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

  return get(mode);
}

export function setStorageMode(val) {
  set(mode, val);
}

export function getStorageParams() {
  if (!get(params)) {
    set(params, JSON.stringify(initParams));
  }

  const parsedParams = JSON.parse(get(params));
  // Add new properties for already installed apps
  for (const key in initParams) {
    if ((parsedParams[key] === null) | (parsedParams[key] === undefined)) {
      parsedParams[key] = initParams[key];
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

  return parsedParams;
}

export function setStorageParams(val) {
  if (get(params)) {
    set(params, JSON.stringify(val));
  }
}

const get = (key) => {
  return localStorage.getItem(key);
};

const set = (key, value) => {
  return localStorage.setItem(key, value);
};
