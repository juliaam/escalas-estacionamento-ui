import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import MonthPicker from "@/components/MonthPicker/MonthPicker";
import { Label } from "@/components/ui/label";
import { useController, useFormContext } from "react-hook-form";
import { ScaleFormValues } from "@/shared/lib/forms/scaleForm";

interface ScaleHeaderProps {
  scaleName: string;
  className?: string;
  isDisabledGenerateScale?: boolean;
}

const ScaleHeader: React.FC<ScaleHeaderProps> = ({
  className,
  isDisabledGenerateScale,
}) => {
  const { control, setValue, reset } = useFormContext<ScaleFormValues>();
  const {
    field: { value },
  } = useController({ name: "date", control });

  const handleDate = (yearMonthDate: string) => {
    const splittedDate = yearMonthDate.split("-");
    const year = Number(splittedDate[0]);
    const month = Number(splittedDate[1]);
    const date = new Date(year, month - 1);
    reset();
    setValue("date", date);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-end">
        <Button
          disabled={isDisabledGenerateScale}
          type="submit"
          className="gap-1.5"
        >
          <Save className="h-4 w-4" />
          <span>Gerar Escala</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <Label htmlFor="month">Escolha o mês da escala</Label>
            <MonthPicker value={value} onChange={handleDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleHeader;
