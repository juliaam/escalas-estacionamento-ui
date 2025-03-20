import { ChangeEvent, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { InputIcon } from "./InputIcon";
import { Search } from "lucide-react";

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
    <InputIcon
      icon={<Search className="size-4 text-emerald-300" />}
      placeholder="Buscar cooperadores..."
      className={className}
      value={value}
      onChange={handleSearch}
    />
  );
}
