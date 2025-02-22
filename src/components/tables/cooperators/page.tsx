import { Cooperator, cooperatorsColumns } from "./columns";
import { DataTable } from "@/components/tables/shared/dataTable";

function getData(): Cooperator[] {
  return [
    {
      id: "728ed52f",
      name: "Rogério",
      telephone: "21986450181",
    },
  ];
}

export default function CooperatorsTable() {
  return (
    <div className="container py-10">
      <DataTable columns={cooperatorsColumns} data={getData()} />
    </div>
  );
}
