import { AppInputSearch, Button } from "@/components/ui";
import { Cooperator, cooperatorsColumns } from "./columns";
import { DataTable } from "@/components/tables/shared/dataTable";
import { Plus } from "lucide-react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { memo } from "react";
import { coopsList } from "@/shared/mocks/coopsList";

type CooperatorsTableProps = {
  onClickAddCooperator: () => any;
};

function getData(): Cooperator[] {
  return coopsList;
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

  return rankItem(value, filterValue).passed;
}

export const CooperatorsTable = memo(
  ({ onClickAddCooperator }: CooperatorsTableProps) => {
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
          <Button onClick={onClickAddCooperator}>
            Adicionar cooperador <Plus />
          </Button>
        </div>
        <DataTable table={table} />
      </div>
    );
  }
);
