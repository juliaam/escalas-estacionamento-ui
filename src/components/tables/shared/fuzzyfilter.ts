import { rankItem } from "@tanstack/match-sorter-utils";
import { Row } from "@tanstack/react-table";

export function fuzzyFilter<T>(
  row: Row<T>,
  columnId: string,
  filterValue: string
) {
  const value = row.getValue(columnId);
  if (typeof value !== "string") {
    return false;
  }

  return rankItem(value, filterValue).passed;
}
