import { Period } from "@/shared/enums/period";
import { getWedsnesdayAndSundaysInMonth } from "@/shared/utils/getChurchDays";
import { z } from "zod";

export type AssignmentFormValues = z.infer<
  typeof assignmentForm.validationSchema
>;

class AssignmentForm {
  public validationSchema = z.object({
    cooperator_id: z
      .string()
      .nonempty("É necessário que tenha um cooperador escolhido"),
    date: z.date(),
    period: z.enum(Period.values as ["morning", "night"]),
    sector: z.string().nonempty("Setor é obrigatório"),
    reason: z.string().optional(),
  });

  public initialValues(selectedDate: Date) {
    return {
      cooperator_id: "",
      date: getWedsnesdayAndSundaysInMonth(selectedDate)[0],
      period: Period.enum.night,
      sector: "",
      reason: "",
    };
  }
}

export const assignmentForm = new AssignmentForm();
