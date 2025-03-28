import { ScaleTable } from "@/components/tables/scale/components/page";
import { useScale } from "@/shared/hooks/useScale";
import { scaleGroup } from "@/shared/mocks/scaleResult";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Result = () => {
  const { scaleData } = useScale();

  return (
    <>
      {scaleData?.length && (
        <div className="flex h-full flex-col gap-x-10 gap-y-10">
          <span className="text-3xl font-semibold">
            Escala de serviço - {""}
            {format(scaleData[0].date, "MMMM yyyy", {
              locale: ptBR,
            })}
          </span>
          <div className="grid h-full grid-cols-3 rounded-md">
            {scaleGroup.map((scale) => {
              return (
                <div key={scale.id} className="flex h-full">
                  <div className="flex h-full flex-col rounded-md border">
                    <div className="flex items-center border-b text-muted-foreground">
                      <div className="flex h-10 items-center px-2">Data</div>
                    </div>

                    <div className="flex flex-grow items-center justify-center">
                      <span className="-rotate-45">AAA</span>
                    </div>
                  </div>
                  <ScaleTable />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!scaleData?.length && (
        <div className="flex h-full items-center justify-center">
          <span>Nada para exibir aqui</span>
        </div>
      )}
    </>
  );
};
