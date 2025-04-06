import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Textarea } from "../ui";
import { Period } from "@/shared/enums/period";
import { useController, useForm, useFormContext } from "react-hook-form";
import { getDay } from "date-fns";
import {
  exceptionForm,
  ExceptionsFormValues,
} from "@/shared/lib/forms/exceptionForm";
import {
  filterWedsnesdayAndSundaysInMonth,
  getWedsnesdayAndSundaysInMonth,
} from "@/shared/utils/getChurchDays";
import { Cooperator } from "@/shared/types/Cooperator";

type ExceptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exception: ExceptionsFormValues) => void;
  setCooperatorId: (coopId: string) => void;
  cooperators: Cooperator[];
  selectedCooperatorId?: string;
};

const getAvailablePeriod = (dayOfWeek: number) => {
  if (dayOfWeek === 0) return Period.values;
  return [Period.enum.night];
};

const ExceptionModal: React.FC<ExceptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cooperators,
  selectedCooperatorId,
}) => {
  const { getValues, watch } = useFormContext();
  const { handleSubmit, control, reset } = useForm<ExceptionsFormValues>({
    defaultValues: exceptionForm.initialValues(getValues("date")),
  });
  const {
    field: { value: cooperatorId, onChange: onChangeCooperatorId },
  } = useController({
    name: "cooperator_id",
    control,
    defaultValue: selectedCooperatorId,
  });
  const {
    field: { value: date, onChange: onChangeDate },
  } = useController({ name: "date", control });
  const {
    field: { value: period, onChange: onChangePeriod },
  } = useController({ name: "period", control });
  const {
    field: { value: reason, onChange: onChangeReason },
  } = useController({ name: "reason", control });
  const selectedDateForScale: Date = watch("date");

  const onSubmit = (data: ExceptionsFormValues) => {
    onSave(data);
    reset();
  };

  const onCloseModal = () => {
    console.log("fechando modal");
    reset();
    onClose();
  };

  useEffect(() => {
    if (selectedCooperatorId) {
      onChangeCooperatorId(selectedCooperatorId);
    }
  }, [selectedCooperatorId]);

  useEffect(() => {
    onChangeDate(getWedsnesdayAndSundaysInMonth(selectedDateForScale)[0]);
  }, [selectedDateForScale]);

  console.log(date, "date");
  console.log(getDay(date));

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent className="animate-slide-up sm:max-w-[425px]">
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Adicionar Exceção
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="cooperator">
              Cooperador <span className="text-red-600">*</span>
            </Label>
            <Select
              disabled={!!selectedCooperatorId}
              value={cooperatorId}
              onValueChange={onChangeCooperatorId}
            >
              <SelectTrigger id="cooperator">
                <SelectValue placeholder="Selecione um cooperador" />
              </SelectTrigger>
              <SelectContent>
                {cooperators.map((cooperator) => (
                  <SelectItem key={cooperator.id} value={cooperator.id}>
                    {cooperator.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-full gap-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="date">
                Data da Exceção <span className="text-red-600">*</span>
              </Label>
              <DatePicker
                id="date"
                month={selectedDateForScale}
                disabled={filterWedsnesdayAndSundaysInMonth()}
                date={date}
                onSelect={onChangeDate}
                placeholder="Selecione a data"
              />
            </div>
            <div className="grid w-full flex-1 gap-2">
              <Label htmlFor="cooperator">
                Período <span className="text-red-600">*</span>
              </Label>
              <Select value={period} onValueChange={onChangePeriod}>
                <SelectTrigger id="cooperator">
                  <SelectValue placeholder="Selecione um cooperador" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailablePeriod(getDay(date)).map(
                    (period: keyof typeof Period.enum) => (
                      <SelectItem key={period} value={period}>
                        {Period.getLabel(period)}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Motivo (opcional)</Label>
            <Textarea value={reason} onChange={onChangeReason} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Exceção</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExceptionModal;
