import { Input } from "@/components/ui/input";
import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import debounce from "lodash.debounce";

interface ListCooperatorsProps {
  cooperators: string[];
  actionIcon: ReactNode;
  title: string;
  onClickButton: (cooperator: string) => void;
}

const formatString = (string: string) => string.trim().toLowerCase();

export function ListCooperators({
  cooperators,
  actionIcon,
  title,
  onClickButton,
}: ListCooperatorsProps) {
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setInputValue(value);
      }, 500),
    []
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const filteredResults = useMemo(() => {
    if (!inputValue) return cooperators;
    return cooperators.filter((cooperator) =>
      formatString(cooperator).includes(formatString(inputValue))
    );
  }, [inputValue, cooperators]);

  return (
    <div className="flex flex-col gap-y-4 px-2">
      <span className="text-lg">{title}</span>
      <Input placeholder="Pesquise..." onChange={handleSearch} />
      <div className="flex flex-col max-h-[30rem] min-h-[30rem] overflow-auto scroll-smooth px-2">
        {/* ajustar max-width */}
        {filteredResults.map((cooperator) => {
          return (
            <div
              className="w-full flex justify-between border-b-black border-b p-1"
              key={cooperator}
            >
              <span>{cooperator}</span>
              <button
                onClick={() => {
                  onClickButton(cooperator);
                }}
                className="border border-white rounded-md px-1 py-1 bg-zinc-800 hover:bg-green-500 focus:bg-green-500 focus:outline-none focus:ring-2  transition duration-200"
              >
                {actionIcon}
              </button>
            </div>
          );
        })}
        {!filteredResults.length && "Não há resultados para essa busca"}
      </div>
    </div>
  );
}
