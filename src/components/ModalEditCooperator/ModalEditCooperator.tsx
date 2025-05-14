import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { FormProvider, useForm } from "react-hook-form";
import {
  editCooperatorForm,
  EditCooperatorFormValues,
} from "@/shared/lib/forms/editCooperatorForm";

import { FormSelect } from "../forms";
import { sectors } from "@/shared/mocks/sectors";
import { useState } from "react";
import { getStandingOrSeatedSectors } from "@/shared/utils/getSeatedOrStandingSector";
import { SectorSelector } from "./SectorSelector/SectorSelector";

type EditCooperatorModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const { standing, seated } = getStandingOrSeatedSectors(sectors);

export const ModalEditCooperator = ({
  isOpen,
  setIsOpen,
}: EditCooperatorModalProps) => {
  const methods = useForm<EditCooperatorFormValues>({
    defaultValues: editCooperatorForm.initialValues,
  });
  const [selectedStanding, setSelectedStanding] = useState<string[]>([]);
  const [selectedSeated, setSelectedSeated] = useState<string[]>([]);
  const { handleSubmit } = methods;

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onSave = (_data: EditCooperatorFormValues) => {};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <FormProvider {...methods}>
          <form className="grid gap-4" onSubmit={handleSubmit(onSave)}>
            <DialogHeader>
              <DialogTitle>Configurar cooperador</DialogTitle>
            </DialogHeader>
            <FormSelect
              name="type"
              options={[
                { label: "Cooperador", value: "COOPERATOR" },
                { label: "Diácuno", value: "DEACUN" },
              ]}
              label="Tipo"
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
              <Button variant="outline" onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button type="submit">Alterar</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
