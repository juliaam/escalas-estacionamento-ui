import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/shared/utils/twMerge";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = CalendarProps & {
  date: Date | undefined;
  onSelect: any;
  placeholder?: string;
  className?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onSelect,
  placeholder = "Selecionar data",
  className,
  ...props
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-9 w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...props}
          initialFocus
          className={cn("pointer-events-auto p-3")}
          selected={date}
          mode="single"
          onSelect={onSelect}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
