import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Textarea,
} from "@/components/ui";
import { Switch } from "../ui/switch";
import { useController, useForm } from "react-hook-form";
import {
  editCooperatorForm,
  EditCooperatorFormValues,
} from "@/shared/lib/forms/editCooperatorForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type EditCooperatorModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const ModalEditCooperator = ({
  isOpen,
  setIsOpen,
}: EditCooperatorModalProps) => {
  const { watch, control, handleSubmit } = useForm<EditCooperatorFormValues>({
    defaultValues: editCooperatorForm.initialValues,
  });
  const {
    field: { onChange: onChangeException, value: hasException },
  } = useController({ name: "hasPinnedException", control });
  const {
    field: { onChange: onChangeType, value: type },
  } = useController({ name: "type", control });

  const hasPinnedException = watch("hasPinnedException");

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onSave = (_data: EditCooperatorFormValues) => {};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSave)}>
          <DialogHeader>
            <DialogTitle>Configurar cooperador</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={onChangeType}>
              <SelectTrigger id="cooperator">
                <SelectValue placeholder="Selecione um cooperador" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "Cooperador", value: "COOPERATOR" },
                  { label: "Diácuno", value: "DEACUN" },
                ].map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Tipo</Label>
            <Switch
              disabled
              onCheckedChange={onChangeException}
              checked={hasException}
            />
          </div>
          <div className="grid gap-2">
            <Label>Motivo (opcional)</Label>
            <Textarea disabled={!hasPinnedException} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">Alterar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
