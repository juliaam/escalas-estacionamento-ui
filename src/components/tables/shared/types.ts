import { Table } from "@tanstack/react-table";

export type DataTableProps<TData> = {
  table: Table<TData>;
  hasPagination?: boolean;
  isLoading?: boolean;
};
