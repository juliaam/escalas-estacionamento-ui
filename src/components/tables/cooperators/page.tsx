import { AppInputSearch, Button } from "@/components/ui";
import { Cooperator, cooperatorsColumns } from "./columns";
import { DataTable } from "@/components/tables/shared/dataTable";
import { Plus } from "lucide-react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo, useEffect, useMemo } from "react";
import { fuzzyFilter } from "../shared/fuzzyfilter";
import { useCooperators } from "@/shared/hooks/useCooperators";

type CooperatorsTableProps = {
  onClickAddCooperator: () => void;
  data: Cooperator[];
  isLoading: boolean;
};

export const CooperatorsTable = ({
  onClickAddCooperator,
  data,
  isLoading,
}: CooperatorsTableProps) => {
  const table = useReactTable<Cooperator>({
    columns: cooperatorsColumns,
    enableGlobalFilter: true,
    data: data,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-end justify-between">
        <div className="w-1/4">
          <AppInputSearch
            placeholder="Pesquise cooperadores..."
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
};
