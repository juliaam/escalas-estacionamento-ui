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

const formatMonth = (month: string) => month.slice(0, 5).toUpperCase();

export const Result = () => {
  const { scaleData } = useScale();

  return (
    <>
      {scaleData?.length > 0 && (
        <div className="flex h-full flex-col gap-x-10 gap-y-4 p-4">
          <span className="text-4xl font-semibold">
            Escala de serviço - {""}
            {format(scaleData[0].date, "MMMM yyyy", {
              locale: ptBR,
            })}
          </span>
          <div className="flex h-full flex-wrap justify-between gap-y-4 rounded-md">
            {scaleData.map((scale) => {
              return (
                <div key={scale.id} className="flex">
                  <div className="flex h-full flex-col rounded-md border bg-zinc-50">
                    <div className="flex items-center border-b text-muted-foreground">
                      <div className="flex h-10 items-center px-2">Data</div>
                    </div>

                    <div className="flex min-w-[5.5rem] flex-grow items-center justify-center">
                      <span className="-rotate-45">
                        {`${formatMonth(format(scale.date, "d MMMM", { locale: ptBR }))} ${getDayAbbreviated(getDay(scale.date), scale.period)}`}
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
