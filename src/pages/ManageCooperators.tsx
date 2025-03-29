import { CooperatorsTable } from "@/components/tables/cooperators/page";
import { ModalAddCooperators } from "@/components/ModalAddCooperators/ModalAddCooperators";
import { useCallback, useState } from "react";

export const ManageCooperators = () => {
  const [open, setOpen] = useState(false);

  const onClickAddCooperator = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-y-4 p-4">
      <span className="text-4xl">Gerenciar Cooperadores</span>
      <CooperatorsTable onClickAddCooperator={onClickAddCooperator} />
      <ModalAddCooperators open={open} onOpenChange={setOpen} />
    </div>
  );
};
