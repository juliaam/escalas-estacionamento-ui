import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import MonthPicker from "@/components/MonthPicker/MonthPicker";
import { Label } from "@/components/ui/label";
import { useController, useFormContext } from "react-hook-form";
import { ScaleFormValues } from "@/shared/lib/forms/scaleForm";

interface ScaleHeaderProps {
  scaleName: string;
  className?: string;
}

const ScaleHeader: React.FC<ScaleHeaderProps> = ({ className }) => {
  const { register, control, setValue, reset } =
    useFormContext<ScaleFormValues>();
  const {
    field: { value },
  } = useController({ name: "date", control });

  return (
    <div className={className}>
      <div className="flex items-center justify-end">
        <Button type="submit" className="gap-1.5">
          <Save className="h-4 w-4" />
          <span>Gerar Escala</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nome da Escala
          </label>
          <Input
            {...register("name")}
            placeholder="Ex: Escala de Julho/2023"
            className="max-w-md"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <Label htmlFor="month">Escolha o mês da escala</Label>
            <MonthPicker
              value={value}
              onChange={(date: string) => {
                reset();
                setValue(
                  "date",
                  new Date(
                    Number(date.split("-")[0]),
                    Number(date.split("-")[1])
                  )
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleHeader;
