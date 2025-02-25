import { ChangeEvent, useMemo, useState } from "react";
import { Input } from "@/components/ui";
import debounce from "lodash.debounce";
import { cn } from "@/shared/lib/utils";

export interface InputSearchProps {
  onChangeValue: (value: string) => any;
  className?: string;
}

export function AppInputSearch({ onChangeValue, className }: InputSearchProps) {
  const [value, setValue] = useState("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onChangeValue(value);
      }, 500),
    []
  );

  return (
    <Input
      placeholder="🔍 Pesquise..."
      className={cn("bg-white", className)}
      value={value}
      onChange={handleSearch}
    />
  );
}
