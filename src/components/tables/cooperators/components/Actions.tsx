import { ModalEditCooperator } from "@/components/ModalEditCooperator/ModalEditCooperator";
import { RemoveCooperatorModal } from "@/components/RemoveCooperatorModal/RemoveCooperatorModal";
import { AppTooltipIconButton } from "@/components/ui/application/TooltipIconButton";
import { Wrench, X } from "lucide-react";
import { useState } from "react";

const TooltipText = ({ text }: { text: string }) => {
  return <span className="text-md">{text}</span>;
};

export const CooperatorsActions = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onClickEdit = () => {
    setOpenEdit(true);
  };

  const onClickDelete = () => {
    setOpenDelete(true);
  };
  return (
    <div className="flex justify-center gap-x-2">
      <ModalEditCooperator isOpen={openEdit} setIsOpen={setOpenEdit} />
      <RemoveCooperatorModal isOpen={openDelete} setIsOpen={setOpenDelete} />
      <AppTooltipIconButton
        className="bg-gray-700 text-white hover:bg-gray-500 hover:text-white"
        icon={<Wrench size={16} />}
        tooltip={<TooltipText text="Alterar Cooperador" />}
        onClick={onClickEdit}
      />
      <AppTooltipIconButton
        className="bg-red-500 text-black hover:bg-red-400"
        icon={<X size={16} />}
        tooltip={<TooltipText text="Excluir cooperador" />}
        onClick={onClickDelete}
      />
    </div>
  );
};
