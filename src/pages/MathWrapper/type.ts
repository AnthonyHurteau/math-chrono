import { Params } from "../Params/types";

export type MathWrapperProps = {
  isMobile: boolean;
  isMdPlus: boolean;
  params: Params;
};

export type Operators = "+" | "-" | "*" | "/";

export type Operation = {
    id: number;
    operation: string;
    operationText: string;
    answer?: string;
    rightAnswer?: number;
    isRightAnswer?: boolean;
}
