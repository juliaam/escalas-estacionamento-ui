import {
  SelectShadCN,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from "@/components";
import { Option } from "@/shared/types/option";

type SelectBaseProps = {
  name: string;
  value: string;
  placeholder?: string;
  options: Option[];
  onValueChange?: (value: string) => void;
};

type SelectProps = SelectBaseProps & {
  label?: string;
};

export function SelectBase({
  options,
  placeholder,
  ...props
}: SelectBaseProps) {
  return (
    <SelectShadCN {...props}>
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

export function Select({ name = "select", label = "", ...props }: SelectProps) {
  if (!label) return <SelectBase name={name} {...props} />;

  return (
    <div className="flex flex-col gap-y-1">
      <Label htmlFor={name} className="text-md text-base">
        {label}
      </Label>
      <SelectBase name={name} {...props} />
    </div>
  );
}
