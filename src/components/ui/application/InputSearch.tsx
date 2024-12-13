import { ChangeEvent, Dispatch, SetStateAction, useMemo } from "react";
import { Input } from "@/components/ui";
import debounce from "lodash.debounce";

export interface InputSearchProps {
  setInputValue: Dispatch<SetStateAction<string>>;
}

export function InputSearch({ setInputValue }: InputSearchProps) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setInputValue(value);
      }, 500),
    []
  );

  return <Input placeholder="Pesquise..." onChange={handleSearch} />;
}
