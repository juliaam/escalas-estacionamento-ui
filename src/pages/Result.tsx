import { ScaleTable } from "@/components/tables/scale/components/page";
import { Period } from "@/shared/enums/period";
import { useScale } from "@/shared/hooks/useScale";
import { format, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";

const getDayAbbreviated = (
  dayOfWeek: number,
  period: keyof typeof Period.enum
) => {
  if (dayOfWeek === 2) return "QUA";
  if (dayOfWeek === 6) {
    if (period === Period.enum.morning) return "DM";
    return "DN";
  }
};

export const Result = () => {
  const { scaleData } = useScale();

  return (
    <>
      {scaleData?.length > 0 && (
        <div className="m-10 flex h-full flex-col gap-x-10 gap-y-10">
          <span className="text-3xl font-semibold">
            Escala de serviço - {""}
            {format(scaleData[0].date, "MMMM yyyy", {
              locale: ptBR,
            })}
          </span>
          <div className="flex h-full flex-wrap justify-evenly gap-10 rounded-md">
            {scaleData.map((scale) => {
              return (
                <div key={scale.id} className="flex">
                  <div className="flex h-full flex-col rounded-md border bg-zinc-50">
                    <div className="flex items-center border-b text-muted-foreground">
                      <div className="flex h-10 items-center px-2">Data</div>
                    </div>

                    <div className="flex flex-grow items-center justify-center">
                      <span className="-rotate-45">
                        {`${format(scale.date, "d MMMM", { locale: ptBR })} ${getDayAbbreviated(getDay(scale.date), scale.period)}`}
                      </span>
                    </div>
                  </div>
                  <ScaleTable
                    data={scale.sectors.map((sec) => ({
                      name: sec.cooperators[0].name,
                      sector: sec.name,
                    }))}
                  />
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
