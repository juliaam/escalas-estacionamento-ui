import { DatePicker } from "@/components/ui/application/DatePicker";
import { Button, Label, Select, Textarea } from "@/components/ui";
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
      <div className="flex gap-2">
        <Controller
          name="cooperator"
          control={control}
          render={({ field }) => (
            <Select
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
            <DatePicker
              placeholder="Selecione a data"
              value={field.value}
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
