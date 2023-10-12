import { Dispatch, SetStateAction } from "react";

export type Params = {
  isTime: boolean;
  time: Date;
  operands: number;
  addition: boolean;
  substraction: boolean;
  multiplication: boolean;
  division: boolean;
  amount: number;
  maximum: number;
  isTables: boolean;
  tablesMultiplication: boolean;
  tablesDivision: boolean;
  tablesMaximum: number;
  tablesSelection: TablesSelection[];
  negativeNumbers: boolean;
  negativeButtonMobile: boolean;
};

export type TablesSelection = {
  label: number;
  value: boolean;
};

export type Param = {
  key: string;
  array: TablesSelection[];
};

export type ParamsProps = {
  isMobile: boolean;
  params: Params;
  setParams: Dispatch<SetStateAction<Params>>;
};

export type ValidationMinMax = {
  operandsMin: number;
  operandsMax: number;
  amountMin: number;
  amountMax: number;
  maximumMin: number;
  maximumMax: number;
  tablesMaximumMin: number;
  tablesMaximumMax: number;
};
