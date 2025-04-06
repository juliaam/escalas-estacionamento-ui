import { cooperatorsColumns } from "./columns";
import { DataTable } from "@/components/tables/shared/dataTable";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo } from "react";
import { fuzzyFilter } from "../../shared/fuzzyfilter";

type ScaleTableProps = {
  data: { name: string; sector: string }[];
};

export const ScaleTable = memo(({ data }: ScaleTableProps) => {
  const table = useReactTable({
    columns: cooperatorsColumns,
    enableGlobalFilter: true,
    data: data,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <DataTable hasPagination={false} table={table} />;
});
