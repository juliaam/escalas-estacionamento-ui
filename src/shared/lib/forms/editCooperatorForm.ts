import { Cooperator } from "@/shared/enums/cooperatorType";
import { z } from "zod";

export type EditCooperatorFormValues = z.infer<
  typeof editCooperatorForm.validationSchema
>;

class EditCooperatorForm {
  public validationSchema = z.object({
    type: z.enum(Cooperator.values as ["DEACUN", "COOPERATOR"]),
    hasPinnedException: z.boolean(),
  });

  public initialValues: EditCooperatorFormValues = {
    hasPinnedException: false,
    type: Cooperator.enum.COOPERATOR,
  };
}

export const editCooperatorForm = new EditCooperatorForm();
