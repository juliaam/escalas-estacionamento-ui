import { ColumnDef } from "@tanstack/react-table";

export type Cooperator = {
  id: string;
  name: string;
  telephone: string;
  actions: string;
};

export const cooperatorsColumns: ColumnDef<Cooperator>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "telephone",
    header: "Telefone",
  },
  {
    accessorKey: "actions",
    header: "Gerenciar",
  },
];
