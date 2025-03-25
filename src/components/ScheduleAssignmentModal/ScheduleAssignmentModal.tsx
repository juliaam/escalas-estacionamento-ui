import React from "react";
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
import { Cooperator } from "@/components/CooperatorCard/CooperatorCard";
import { Textarea } from "../ui";
import { useController, useForm, useFormContext } from "react-hook-form";
import { AssignmentFormValues } from "@/shared/lib/forms/assignmentForm";
import { Period } from "@/shared/enums/period";

interface ScheduleAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cooperators: Cooperator[];
  selectedCooperatorId?: string;
}

export interface AssignmentData {
  cooperatorId: string;
  date: Date;
  id: string;
}

const ScheduleAssignmentModal: React.FC<ScheduleAssignmentModalProps> = ({
  isOpen,
  onClose,
  cooperators,
  selectedCooperatorId,
}) => {
  const { control, handleSubmit, ...methods } = useForm<AssignmentFormValues>();
  const {
    field: { onChange: onChangeCooperatorId, value: cooperator_id },
  } = useController({ name: "cooperator_id", control });
  const {
    field: { onChange: onChangeDate, value: date },
  } = useController({ name: "date", control });
  const {
    field: { value: period, onChange: onChangePeriod },
  } = useController({ name: "period", control });
  const {
    field: { onChange: onChangeReason, value: reason },
  } = useController({ name: "reason", control });

  const handleSave = (data: AssignmentFormValues) => {
    handleClose();
  };

  const handleClose = () => {
    // setCooperatorId(selectedCooperatorId || "");
    // setAssignmentDate(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            <Label htmlFor="cooperator">Cooperador</Label>
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
              <Label>Data da escolha</Label>
              <DatePicker
                date={date}
                onSelect={onChangeDate}
                placeholder="Selecione a data"
              />
            </div>
            <div className="grid w-full flex-1 gap-2">
              <Label>Período</Label>
              <Select value={period} onValueChange={onChangePeriod}>
                <SelectTrigger id="cooperator">
                  <SelectValue placeholder="Selecione um cooperador" />
                </SelectTrigger>
                <SelectContent>
                  {Period.values.map((period) => (
                    <SelectItem key={period} value={period}>
                      {Period.getLabel(period)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Motivo (opcional)</Label>
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
