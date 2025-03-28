import { scaleGroup } from "@/shared/mocks/scaleResult";
import { ScaleResult } from "@/shared/types/ScaleResult";
import { createContext } from "react";

type ScaleContextType = {
  scaleData: ScaleResult[];
  setScaleData: any;
};

console.log("scaleResult", scaleGroup);

export const ScaleContext = createContext<ScaleContextType>({
  scaleData: [],
  setScaleData: undefined,
});
