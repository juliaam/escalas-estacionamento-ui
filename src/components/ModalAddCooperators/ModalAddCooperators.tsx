import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@/components/ui";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useController, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CooperatorService } from "@/services/CooperatorService";
import {
  AddCooperatorFormValues,
  addCooperatorForm,
} from "@/shared/lib/forms/addCooperatorForm";
import { useCooperators } from "@/shared/hooks/useCooperators";

type ModalAddCooperatorsProps = DialogProps & {
  onClose: () => void;
  onSaveEmit: () => void;
};

export const ModalAddCooperators = ({
  onClose,
  onSaveEmit,
  ...props
}: ModalAddCooperatorsProps) => {
  const { reset, handleSubmit, control } = useForm({
    defaultValues: addCooperatorForm.initialValues,
  });
  const {
    field: { value: name, onChange: onChangeName },
  } = useController({ name: "name", control });
  const {
    field: { value: telephone, onChange: onChangeTelephone },
  } = useController({ name: "telephone", control });
  const {
    field: { value: type, onChange: onChangeType },
  } = useController({ name: "type", control });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = async (data: AddCooperatorFormValues) => {
    try {
      await CooperatorService.add(data);
      onSaveEmit();
      onClose();
      toast("Cooperador adicionado com sucesso!");
    } catch {
      toast("Houve um erro");
    }
  };

  return (
    <Dialog onOpenChange={handleClose} {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar cooperador</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit(handleSave)}>
          <div className="grid gap-2">
            <Label>
              Nome <span className="text-red-600">*</span>
            </Label>
            <Input value={name} onChange={onChangeName} />
          </div>
          <div className="grid gap-2">
            <Label>
              Tipo <span className="text-red-600">*</span>
            </Label>
            <Select value={type} onValueChange={onChangeType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "Cooperador", value: "COOPERATOR" },
                  { label: "Diácuno", value: "DIACUN" },
                ].map((typeCooperator) => (
                  <SelectItem
                    key={typeCooperator.value}
                    value={typeCooperator.value}
                  >
                    {typeCooperator.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Telefone</Label>
            <Input value={telephone} onChange={onChangeTelephone} />
          </div>
          <DialogFooter>
            <Button variant="outline">Cancelar</Button>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
