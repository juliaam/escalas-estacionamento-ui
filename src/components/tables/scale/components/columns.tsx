import { ColumnDef } from "@tanstack/react-table";

export type Scale = {
  name: string;
  sector: string;
};

export const cooperatorsColumns: ColumnDef<Scale>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "sector",
    header: "Setor",
  },
];
