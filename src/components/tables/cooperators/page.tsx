import { AppInputSearch, Button } from "@/components/ui";
import { Cooperator, cooperatorsColumns } from "./columns";
import { DataTable } from "@/components/tables/shared/dataTable";
import { Plus, Search } from "lucide-react";
import {
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
function getData(): Cooperator[] {
  return [
    {
      id: "728ed52f",
      name: "Rogério",
      telephone: "21986450181",
    },
    {
      id: "324fg57k",
      name: "Júlia",
      telephone: "21986450181",
    },
  ];
}

function fuzzyFilter(
  row: Row<Cooperator>,
  columnId: string,
  filterValue: string
) {
  const value = row.getValue(columnId);
  if (typeof value !== "string") {
    return false;
  }

  return rankItem(value, filterValue).passed; // Apenas retorna true/false
}

export const CooperatorsTable = () => {
  const table = useReactTable({
    columns: cooperatorsColumns,
    enableGlobalFilter: true,
    data: getData(),
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-end justify-between">
        <div className="w-1/4">
          <AppInputSearch
            className="w-full"
            onChangeValue={table.setGlobalFilter}
          />
        </div>

        <Button>
          Adicionar cooperador <Plus />
        </Button>
      </div>
      <DataTable table={table} />
    </div>
  );
};
