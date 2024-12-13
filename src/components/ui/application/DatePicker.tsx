import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { SelectSingleEventHandler } from "react-day-picker";

type DatePickerProps = {
  value: Date | undefined;
  placeholder?: string;
  onValueChange?: SelectSingleEventHandler;
};

export function DatePicker({
  placeholder = "",
  value,
  onValueChange,
}: DatePickerProps) {
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
