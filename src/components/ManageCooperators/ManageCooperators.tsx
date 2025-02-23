import { CooperatorsTable } from "@/components/tables/cooperators/page";

export const ManageCooperators = () => {
  return (
    <div className="container my-10 flex flex-col gap-y-4">
      <span className="text-4xl">Gerenciar Cooperadores</span>
      <CooperatorsTable />
    </div>
  );
};
