import { ScaleResult } from "@/shared/types/ScaleResult";
import { createContext } from "react";

type ScaleContextType = {
  scaleData: ScaleResult[];
  setScaleData: any;
};

export const ScaleContext = createContext<ScaleContextType>({
  scaleData: [],
  setScaleData: undefined,
});
