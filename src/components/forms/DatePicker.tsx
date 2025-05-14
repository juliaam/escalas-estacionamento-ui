import { useFormContext, FieldValues, FieldPath } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import DatePicker from "@/components/DatePicker/DatePicker";

type FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  disabledDates?: Date[];
  month?: Date;
};

export function FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  placeholder = "Selecione uma data",
  required = false,
  disabled = false,
  disabledDates,
  month,
}: FormDatePickerProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-600">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <DatePicker
              date={field.value}
              onSelect={field.onChange}
              disabled={disabledDates}
              placeholder={placeholder}
              month={month}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
