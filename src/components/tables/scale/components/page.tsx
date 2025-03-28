import { cooperatorsColumns, Scale } from "./columns";
import { DataTable } from "@/components/tables/shared/dataTable";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo } from "react";
import { fuzzyFilter } from "../../shared/fuzzyfilter";

function getData(): Scale[] {
  return [];
}

export const ScaleTable = memo(() => {
  const table = useReactTable({
    columns: cooperatorsColumns,
    enableGlobalFilter: true,
    data: getData(),
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <DataTable hasPagination={false} table={table} />;
});
