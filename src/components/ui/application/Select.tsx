import {
  Select as SelectShadCN,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "@/shared/types/option";

type SelectProps = {
  name: string;
  value: string;
  options: Option[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
};

export function Select({
  name = "",
  value = "",
  options = [],
  placeholder = "",
  onValueChange,
}: SelectProps) {
  return (
    <SelectShadCN name={name} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectShadCN>
  );
}
