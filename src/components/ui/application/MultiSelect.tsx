import { cn } from "@/shared/utils/twMerge";
import { Option } from "@/shared/types/option";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

import { ChevronsUpDown, Check } from "lucide-react";
import { useState } from "react";

export interface MultiSelectProps {
  options: Option[];
  placeholder: string;
}

export function AppMultiSelect({
  options = [],
  placeholder,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedValues] = useState([]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValues
            ? options.map((opt) =>
                selectedValues.some(
                  (selectedValue) => selectedValue === opt.value
                )
              )
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No Option found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={(selected) => {
                    console.log(selected);
                  }}
                >
                  {opt.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValues.some(
                        (selectedValue) => selectedValue === opt.value
                      )
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
