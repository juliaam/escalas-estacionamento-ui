import { useScale } from "@/shared/hooks/useScale";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Result = () => {
  const { scaleData } = useScale();

  return (
    <div className="h-full">
      {scaleData?.length && (
        <span>
          Escala de serviço -
          {format(scaleData[0].date, "MMMM yyyy", {
            locale: ptBR,
          })}
        </span>
      )}
      <div className="flex h-full items-center justify-center">
        {!scaleData?.length && <span>Nada para exibir aqui</span>}
      </div>
    </div>
  );
};
