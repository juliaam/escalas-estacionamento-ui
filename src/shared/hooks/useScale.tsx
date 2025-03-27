import { useContext } from "react";
import { ScaleContext } from "./ScaleContext/ScaleContext";

export const useScale = () => {
  const context = useContext(ScaleContext);
  if (!context)
    throw new Error("useScale deve ser usado dentro do ScaleProvider");
  return context;
};
