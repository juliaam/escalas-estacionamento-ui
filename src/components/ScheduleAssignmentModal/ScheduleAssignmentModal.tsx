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
import { useController, useForm, useFormContext } from "react-hook-form";
import {
  assignmentForm,
  AssignmentFormValues,
} from "@/shared/lib/forms/assignmentForm";
import { Period } from "@/shared/enums/period";
import {
  filterWedsnesdayAndSundaysInMonth,
  getWedsnesdayAndSundaysInMonth,
} from "@/shared/utils/getChurchDays";
import { Cooperator } from "@/shared/types/Cooperator";
import { getAvailablePeriod } from "@/shared/utils/availableDays";
import { getDay } from "date-fns";
import { useSectors } from "@/shared/hooks/useSector";

interface ScheduleAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AssignmentFormValues) => void;
  cooperators: Cooperator[];
  selectedCooperatorId?: string;
}

export interface AssignmentData {
  cooperatorId: string;
  date: Date;
  id: string;
  reason: string;
}

const ScheduleAssignmentModal: React.FC<ScheduleAssignmentModalProps> = ({
  isOpen,
  onClose,
  cooperators,
  selectedCooperatorId,
  onSave,
}) => {
  const { data: sectors, fetchSectors } = useSectors();
  const { getValues, watch } = useFormContext();
  const { control, handleSubmit, reset, ...methods } =
    useForm<AssignmentFormValues>({
      defaultValues: assignmentForm.initialValues(getValues("date")),
    });
  const {
    field: { onChange: onChangeCooperatorId, value: cooperator_id },
  } = useController({
    name: "cooperator_id",
    control,
    defaultValue: selectedCooperatorId,
  });
  const {
    field: { onChange: onChangeDate, value: date },
  } = useController({ name: "date", control });
  const {
    field: { value: period, onChange: onChangePeriod },
  } = useController({ name: "period", control });
  const {
    field: { onChange: onChangeSector, value: sector },
  } = useController({ name: "sector", control });
  const {
    field: { onChange: onChangeReason, value: reason },
  } = useController({ name: "reason", control });

  const selectedDateForScale: Date = watch("date");

  const handleSave = (data: AssignmentFormValues) => {
    onSave(data);
    reset();
    handleClose();
  };

  const handleClose = () => {
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

  useEffect(() => {
    fetchSectors();
  }, []);

  console.log(selectedCooperatorId, "oi");

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="animate-slide-up sm:max-w-[425px]">
        <form
          className="grid gap-4 py-4"
          {...methods}
          onSubmit={handleSubmit(handleSave)}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Agendar Cooperador
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="cooperator">
              Cooperador <span className="text-red-600">*</span>
            </Label>
            <Select
              value={cooperator_id}
              onValueChange={onChangeCooperatorId}
              disabled={!!selectedCooperatorId}
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
                Data da escolha <span className="text-red-600">*</span>
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
                  {getAvailablePeriod(getDay(date)).map((period) => (
                    <SelectItem key={period} value={period}>
                      {Period.getLabel(period)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sector">
              Setor <span className="text-red-600">*</span>
            </Label>
            <Select value={sector} onValueChange={onChangeSector}>
              <SelectTrigger id="sector">
                <SelectValue placeholder="Selecione um setor" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sec) => (
                  <SelectItem key={sec.id} value={sec.id}>
                    {sec.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Motivo</Label>
            <Textarea value={reason} onChange={onChangeReason} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Agendar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleAssignmentModal;
