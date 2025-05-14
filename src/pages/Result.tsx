import { ScaleTable } from "@/components/tables/scale/components/page";
import { Button } from "@/components/ui";
import { Period } from "@/shared/enums/period";
import { useScale } from "@/shared/hooks/useScale";
import { html2PDF } from "@/shared/lib/pdf/html2pdf";
import { format, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRef, useState } from "react";

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

const formatMonth = (date: string) => {
  const month = format(date, "MMMM", {
    locale: ptBR,
  });
  const day = format(date, "dd", {
    locale: ptBR,
  });

  return `${month.slice(0, month.length - 1)} ${day}`.toUpperCase();
};

export const Result = () => {
  const { scaleData } = useScale();
  const [showButton, setShowButton] = useState(true);
  const exportRef = useRef<HTMLDivElement>(null);
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const downloadScale = async () => {
    setShowButton(false);
    await wait(100);
    await html2PDF(exportRef);
    setShowButton(true);
  };
  return (
    <>
      {scaleData?.length > 0 && (
        <div
          className="flex h-full flex-col gap-x-10 gap-y-4 bg-zinc-100 p-4"
          ref={exportRef}
        >
          <div className="flex justify-between">
            <span className="text-4xl font-semibold">
              Escala de serviço - {""}
              {format(scaleData[0].date, "MMMM yyyy", {
                locale: ptBR,
              })}
            </span>
            {showButton && <Button onClick={downloadScale}>Gerar PDF</Button>}
          </div>

          <div className="flex h-full flex-wrap justify-between gap-y-4 rounded-md">
            {scaleData.map((scale) => {
              return (
                <div
                  key={scale.id}
                  className="flex overflow-hidden rounded-md border border-gray-800"
                >
                  <div className="flex h-full flex-col bg-white">
                    <div className="flex items-center border-b border-r border-gray-800 text-muted-foreground">
                      <div className="flex items-center px-2 py-2 font-medium text-black">
                        Data
                      </div>
                    </div>

                    <div className="flex min-w-[6rem] flex-grow items-center justify-center border-r border-gray-800">
                      <span className="-rotate-45 font-medium text-gray-900">
                        {`${formatMonth(scale.date)} ${getDayAbbreviated(getDay(scale.date), scale.period)}`}
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
