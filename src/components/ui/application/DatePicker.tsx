import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
  Button,
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { SelectSingleEventHandler } from "react-day-picker";

type DatePickerBaseProps = {
  name?: string;
  value: Date | undefined;
  placeholder?: string;
  onValueChange?: SelectSingleEventHandler;
};

export type DatePickerProps = DatePickerBaseProps & {
  label?: string;
};

export function DatePickerBase({
  placeholder = "",
  value,
  onValueChange,
}: DatePickerBaseProps) {
  const [openPopover, setOpenPopover] = useState(false);

  useEffect(() => {
    setOpenPopover(false);
  }, [value]);

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "PPP", {
              locale: ptBR,
            })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}

export function AppDatePicker({ name, label, ...props }: DatePickerProps) {
  if (!label) return <DatePickerBase {...props} />;
  return (
    <div className="flex flex-col gap-y-1">
      <Label htmlFor={name} className="text-md text-base">
        {label}
      </Label>
      <DatePickerBase name={name} {...props} />
    </div>
  );
}
