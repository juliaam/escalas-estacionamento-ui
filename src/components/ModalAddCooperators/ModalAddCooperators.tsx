import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { DialogProps } from "@radix-ui/react-dialog";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CooperatorService } from "@/services/CooperatorService";
import {
  AddCooperatorFormValues,
  addCooperatorForm,
} from "@/shared/lib/forms/addCooperatorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "../forms";
import { Cooperator } from "@/shared/enums/cooperatorType";
import { FormInput } from "../forms/FormInput";
import { SectorSelector } from "../ModalEditCooperator/SectorSelector/SectorSelector";
import { useState } from "react";
import { getStandingOrSeatedSectors } from "@/shared/utils/getSeatedOrStandingSector";
import { sectors } from "@/shared/mocks/sectors";

type ModalAddCooperatorsProps = DialogProps & {
  onClose: () => void;
  onSaveEmit: () => void;
};

const { standing, seated } = getStandingOrSeatedSectors(sectors);

export const ModalAddCooperators = ({
  onClose,
  onSaveEmit,
  ...props
}: ModalAddCooperatorsProps) => {
  const [selectedStanding, setSelectedStanding] = useState<string[]>([]);
  const [selectedSeated, setSelectedSeated] = useState<string[]>([]);
  const methods = useForm({
    defaultValues: addCooperatorForm.initialValues,
    resolver: zodResolver(addCooperatorForm.validationSchema),
  });
  const { reset, handleSubmit } = methods;

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
        <FormProvider {...methods}>
          <form className="grid gap-4" onSubmit={handleSubmit(handleSave)}>
            <FormInput
              label="Nome"
              name="name"
              required
              placeholder="Digite aqui o nome do cooperator"
            />
            <FormSelect
              label="Tipo"
              name="type"
              placeholder="Selecione um tipo"
              required
              options={Cooperator.values.map((value) => ({
                label: Cooperator.getLabel(value),
                value: value,
              }))}
            />
            <FormInput
              label="Telefone"
              name="telephone"
              placeholder="Insira aqui o telefone do cooperador"
            />
            <SectorSelector
              standing={standing}
              seated={seated}
              selectedStanding={selectedStanding}
              setSelectedStanding={setSelectedStanding}
              selectedSeated={selectedSeated}
              setSelectedSeated={setSelectedSeated}
            />
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
