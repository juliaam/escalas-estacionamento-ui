import { Cooperator } from "@/shared/enums/cooperatorType";
import { z } from "zod";

export type AddCooperatorFormValues = z.infer<
  typeof addCooperatorForm.validationSchema
>;

class AddCooperatorForm {
  public initialValues: AddCooperatorFormValues = {
    name: "",
    telephone: undefined,
    type: Cooperator.enum.COOPERATOR,
  };
  public validationSchema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    telephone: z.string().optional(),
    type: z.enum(Cooperator.values as ["COOPERATOR", "DEACUN"]),
  });
}

export const addCooperatorForm = new AddCooperatorForm();
