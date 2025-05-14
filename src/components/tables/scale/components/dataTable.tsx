import { DataTableProps } from "@/components/tables";

import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function DataTable<TData>({
  table,
  hasPagination = true,
  isLoading,
}: DataTableProps<TData>) {
  const actualPage = table.getState().pagination.pageIndex + 1;
  const columnCount = table.getAllColumns().length;
  return (
    <>
      <div className="h-full bg-white">
        <Table className="h-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-800">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-auto border-b-0 py-2 font-medium text-black"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-full">
            {isLoading &&
              Array.from({ length: 10 }).map((_, rowIdx) => (
                <TableRow key={`skeleton-row-${rowIdx}`}>
                  {Array.from({ length: columnCount }).map((_, colIdx) => (
                    <TableCell key={`skeleton-cell-${colIdx}`}>
                      <Skeleton className="h-10 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!isLoading && table.getRowModel().rows?.length < 1 && (
              <TableRow>
                <div className="flex gap-2 px-2 py-3">
                  <span>Sem resultados</span>
                </div>
              </TableRow>
            )}
            {!isLoading &&
              table.getRowModel().rows.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-gray-800"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="font-medium text-zinc-800"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {hasPagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          {!isLoading && (
            <>
              <span>
                Página {actualPage} de {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.firstPage()}
              >
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.lastPage()}
              >
                <ChevronsRight />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
}
