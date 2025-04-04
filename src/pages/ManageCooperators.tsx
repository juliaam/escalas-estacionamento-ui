import { CooperatorsTable } from "@/components/tables/cooperators/page";
import { ModalAddCooperators } from "@/components/ModalAddCooperators/ModalAddCooperators";
import { useCallback, useEffect, useState } from "react";
import { useCooperators } from "@/shared/hooks/useCooperators";

export const ManageCooperators = () => {
  const { data, isLoading, fetchCooperators } = useCooperators();
  const [open, setOpen] = useState(false);

  const onClickAddCooperator = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    fetchCooperators();
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-y-4 p-4">
      <span className="text-4xl">Gerenciar Cooperadores</span>
      <CooperatorsTable
        data={data}
        isLoading={isLoading}
        onClickAddCooperator={onClickAddCooperator}
      />
      <ModalAddCooperators
        onSaveEmit={async () => {
          await fetchCooperators();
        }}
        onClose={() => setOpen(false)}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};
