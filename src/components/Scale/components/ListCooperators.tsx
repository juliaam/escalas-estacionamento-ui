import { InputSearch } from "@/components";
import { ReactNode, useMemo, useState } from "react";

interface ListCooperatorsProps {
  cooperators: string[];
  title?: ReactNode;
  cooperatorContent?: (cooperator: string) => ReactNode;
}

const formatString = (string: string) => string.trim().toLowerCase();

export function ListCooperators({
  cooperators,
  title,
  cooperatorContent,
}: ListCooperatorsProps) {
  const [inputValue, setInputValue] = useState("");

  const filteredResults = useMemo(() => {
    if (!inputValue) return cooperators;
    return cooperators.filter((cooperator) =>
      formatString(cooperator).includes(formatString(inputValue))
    );
  }, [inputValue, cooperators]);

  return (
    <>
      {title && <span className="text-xl">{title}</span>}
      <InputSearch setInputValue={setInputValue} />
      <div className="flex h-full flex-col overflow-auto scroll-smooth pr-6">
        {filteredResults?.map((cooperator) => {
          return (
            <div
              className="flex w-full justify-between border-b border-b-black p-1"
              key={cooperator}
            >
              <span>{cooperator}</span>
              {cooperatorContent?.(cooperator)}
            </div>
          );
        })}
        {!filteredResults?.length && "Não há resultados para essa busca"}
      </div>
    </>
  );
}
