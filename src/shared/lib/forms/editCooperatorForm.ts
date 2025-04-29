import { Cooperator } from "@/shared/enums/cooperatorType";
import { z } from "zod";

export type EditCooperatorFormValues = z.infer<
  typeof editCooperatorForm.validationSchema
>;

class EditCooperatorForm {
  public validationSchema = z.object({
    type: z.enum(Cooperator.values as ["deacun", "cooperator"]),
    hasPinnedException: z.boolean(),
  });

  public initialValues: EditCooperatorFormValues = {
    hasPinnedException: false,
    type: Cooperator.enum.cooperator,
  };
}

export const editCooperatorForm = new EditCooperatorForm();
