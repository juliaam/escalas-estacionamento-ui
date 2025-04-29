import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Period } from "@/shared/enums/period";
import { useForm, FormProvider } from "react-hook-form";
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
import { getAvailablePeriod } from "@/shared/utils/availableDays";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormDatePicker, FormSelect, FormTextarea } from "../forms";

type ExceptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exception: ExceptionsFormValues) => void;
  setCooperatorId: (coopId: string) => void;
  cooperators: Cooperator[];
  selectedCooperatorId?: string;
  selectedDate?: Date;
};

const ExceptionModal: React.FC<ExceptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cooperators,
  selectedCooperatorId,
  selectedDate,
}) => {
  const methods = useForm<ExceptionsFormValues>({
    defaultValues: exceptionForm.initialValues(selectedDate!),
    resolver: zodResolver(exceptionForm.validationSchema),
  });

  const { reset, handleSubmit, watch, setValue } = methods;
  const selectedDateForScale = watch("date");
  const currentDate = watch("date");

  const cooperatorOptions = cooperators.map((cooperator) => ({
    value: cooperator.id,
    label: cooperator.name,
  }));

  const getPeriodOptions = (date: Date) => {
    return getAvailablePeriod(getDay(date)).map((periodValue) => ({
      value: periodValue,
      label: Period.getLabel(periodValue),
    }));
  };

  const onSubmit = (data: ExceptionsFormValues) => {
    onSave(data);
    reset();
  };

  const onCloseModal = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (selectedCooperatorId) {
      setValue("cooperator_id", selectedCooperatorId);
    }
  }, [selectedCooperatorId, setValue]);

  useEffect(() => {
    if (selectedDate) {
      const firstAvailableDate =
        getWedsnesdayAndSundaysInMonth(selectedDate)[0];
      setValue("date", firstAvailableDate);
    }
  }, [selectedDate, setValue]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent className="animate-slide-up sm:max-w-md">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Adicionar Exceção
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormSelect
                name="cooperator_id"
                label="Cooperador"
                placeholder="Selecione um cooperador"
                options={cooperatorOptions}
                disabled={!!selectedCooperatorId}
                required
              />

              <div className="flex w-full gap-x-2">
                <div className="flex-1">
                  <FormDatePicker
                    name="date"
                    label="Data da Exceção"
                    month={selectedDateForScale}
                    disabledDates={filterWedsnesdayAndSundaysInMonth()}
                    required
                  />
                </div>
                <div className="flex-1">
                  <FormSelect
                    name="period"
                    label="Período"
                    placeholder="Selecione o período"
                    options={getPeriodOptions(currentDate)}
                    required
                  />
                </div>
              </div>
              <FormTextarea
                name="reason"
                label="Motivo"
                placeholder="Informe o motivo da exceção (opcional)"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Exceção</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ExceptionModal;
