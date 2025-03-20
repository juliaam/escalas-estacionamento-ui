import React, { ChangeEvent, useState } from "react";
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
import { Exception } from "@/shared/types/Exception";
import { Period } from "@/shared/enums/period";

interface ExceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exception: Exception) => void;
  setCooperatorId: (coopId: string) => void;
  cooperators: Cooperator[];
  selectedCooperatorId?: string;
}

const ExceptionModal: React.FC<ExceptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cooperators,
  setCooperatorId,
  selectedCooperatorId,
}) => {
  const [formData, setFormData] = useState<{
    date: Date | undefined;
    reason: string;
    period: "day" | "night";
  }>({
    date: undefined,
    reason: "",
    period: "day",
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="animate-slide-up sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Adicionar Exceção
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="cooperator">Cooperador</Label>
            <Select
              value={selectedCooperatorId}
              onValueChange={setCooperatorId}
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

          <div className="flex">
            <div className="grid gap-2">
              <Label>Data da Exceção</Label>
              <DatePicker
                date={formData.date}
                onSelect={(date: Date | undefined) =>
                  setFormData((prev) => ({
                    ...prev,
                    date: date,
                  }))
                }
                label="Selecione a data"
              />
            </div>
            <div className="grid gap-2">
              <Label>Período</Label>
              <Select
                value={formData.period}
                onValueChange={(value: "day" | "night") => {
                  setFormData((prev) => ({
                    ...prev,
                    period: value,
                  }));
                }}
              >
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
            <Textarea
              value={formData.reason}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  reason: event.currentTarget.value,
                }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            onClick={onSave({
              cooperator_id: selectedCooperatorId,
              ...formData,
            })}
          >
            Salvar Exceção
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExceptionModal;
