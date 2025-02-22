import { EditCooperatorModal } from "@/components/EditCooperatorModal/EditCooperatorModal";
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
    <div className="flex gap-x-2">
      <EditCooperatorModal isOpen={openEdit} setIsOpen={setOpenEdit} />
      <RemoveCooperatorModal isOpen={openDelete} setIsOpen={setOpenDelete} />
      <AppTooltipIconButton
        className="border border-black hover:bg-gray-700 hover:text-white"
        icon={<Wrench />}
        tooltip={<TooltipText text="Alterar Cooperador" />}
        onClick={onClickEdit}
      />
      <AppTooltipIconButton
        className="border border-black text-red-500 hover:bg-red-500 hover:text-white"
        icon={<X />}
        tooltip={<TooltipText text="Excluir cooperador" />}
        onClick={onClickDelete}
      />
    </div>
  );
};
