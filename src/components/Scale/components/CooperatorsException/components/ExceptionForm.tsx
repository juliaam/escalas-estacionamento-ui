import {
  Button,
  Label,
  Textarea,
  AppDatePicker,
  AppSelect,
} from "@/components/ui";
import { Controller, useForm } from "react-hook-form";

const options = [{ label: "Claúdio", value: "claudioValue" }];

type ExceptionFormData = {
  cooperator: string; // mudar posteriormente para o tipo do cooperador
  date: Date | undefined;
  reason: string;
};

export function ExceptionForm({}) {
  const { register, handleSubmit, control, reset } =
    useForm<ExceptionFormData>();

  const onSubmit = (data: ExceptionFormData) => {
    console.log(data);
    reset();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-2">
        <Controller
          name="cooperator"
          control={control}
          render={({ field }) => (
            <AppSelect
              label="Cooperador:"
              name="cooperator"
              placeholder="Selecione o cooperador"
              value={field.value}
              options={options}
              onValueChange={field.onChange}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <AppDatePicker
              value={field.value}
              label="Data:"
              placeholder="Selecione a data"
              onValueChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <Label htmlFor="textarea">Motivo: </Label>
        <Textarea id="textarea" {...register("reason")} />
      </div>
      <Button type="submit">Salvar</Button>
    </form>
  );
}
