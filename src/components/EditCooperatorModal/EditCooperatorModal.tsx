import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Textarea,
} from "@/components/ui";
import { Switch } from "../ui/switch";
import { useController, useForm, useWatch } from "react-hook-form";
import {
  editCooperatorForm,
  EditCooperatorFormValues,
} from "@/shared/lib/forms/editCooperatorForm";

type EditCooperatorModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const EditCooperatorModal = ({
  isOpen,
  setIsOpen,
}: EditCooperatorModalProps) => {
  const { watch, control } = useForm<EditCooperatorFormValues>({
    defaultValues: editCooperatorForm.initialValues,
  });
  const {
    field: { onChange: onChangeException, value: hasException },
  } = useController({ name: "hasPinnedException", control });

  const hasPinnedException = watch("hasPinnedException");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar cooperador</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          <Label>Exceção fixada</Label>
          <Switch onCheckedChange={onChangeException} checked={hasException} />
        </div>
        <div className="grid gap-2">
          <Label>Motivo (opcional)</Label>
          <Textarea disabled={!hasPinnedException} />
        </div>
        <DialogFooter>
          <DialogClose />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
