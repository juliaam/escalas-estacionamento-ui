import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import {
  assignmentForm,
  AssignmentFormValues,
} from "@/shared/lib/forms/assignmentForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Period } from "@/shared/enums/period";
import {
  getWedsnesdayAndSundaysInMonth,
  filterWedsnesdayAndSundaysInMonth,
} from "@/shared/utils/getChurchDays";
import { getAvailablePeriod } from "@/shared/utils/availableDays";
import { getDay } from "date-fns";
import { Cooperator } from "@/shared/types/Cooperator";
import { useSectors } from "@/shared/hooks/useSector";

import { FormSelect, FormDatePicker, FormTextarea } from "../forms";

interface ScheduleAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AssignmentFormValues) => void;
  cooperators: Cooperator[];
  selectedCooperatorId?: string;
  selectedDate?: Date;
}

const ScheduleAssignmentModal: React.FC<ScheduleAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cooperators,
  selectedCooperatorId,
  selectedDate,
}) => {
  const methods = useForm<AssignmentFormValues>({
    defaultValues: assignmentForm.initialValues(selectedDate!),
    resolver: zodResolver(assignmentForm.validationSchema),
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const selectedDateForScale = watch("date");
  const currentDate = watch("date");

  const { data: sectors, fetchSectors } = useSectors();

  const sectorOptions = sectors.map((sector) => ({
    label: sector.name,
    value: sector.id,
  }));

  const cooperatorOptions = cooperators.map((cooperator) => ({
    label: cooperator.name,
    value: cooperator.id,
  }));

  const getPeriodOptions = (date: Date) => {
    return getAvailablePeriod(getDay(date)).map((periodValue) => ({
      value: periodValue,
      label: Period.getLabel(periodValue),
    }));
  };

  const onSubmit = (data: AssignmentFormValues) => {
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

  useEffect(() => {
    fetchSectors();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent className="animate-slide-up sm:max-w-md">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Agendar Escala
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

              <FormSelect
                name="sector"
                label="Setor"
                placeholder="Selecione um setor"
                options={sectorOptions}
                required
              />

              <div className="flex w-full gap-x-2">
                <div className="flex-1">
                  <FormDatePicker
                    name="date"
                    label="Data"
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
                name="note"
                label="Observações"
                placeholder="Observações (opcional)"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button type="submit">Agendar</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleAssignmentModal;
