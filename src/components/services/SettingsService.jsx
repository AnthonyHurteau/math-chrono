import { initParams } from "../ParamsComponent";

const mode = "mode";
const params = "params";

export function getStorageMode() {
  if (!get(mode)) {
    set(mode, "dark");
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

  return JSON.parse(get(params));
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
