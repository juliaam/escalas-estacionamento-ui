import { ReactNode, useState } from "react";
import { ScaleContext } from "./ScaleContext";

export const ScaleProvider = ({ children }: { children: ReactNode }) => {
  const [scaleData, setScaleData] = useState(null);

  return (
    <ScaleContext.Provider value={{ scaleData, setScaleData }}>
      {children}
    </ScaleContext.Provider>
  );
};
