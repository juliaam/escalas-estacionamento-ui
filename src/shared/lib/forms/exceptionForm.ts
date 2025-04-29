import { Period } from "@/shared/enums/period";
import { getWedsnesdayAndSundaysInMonth } from "@/shared/utils/getChurchDays";
import { z } from "zod";

export type ExceptionsFormValues = z.infer<
  typeof exceptionForm.validationSchema
>;

class ExceptionForm {
  public validationSchema = z.object({
    cooperator_id: z
      .string()
      .nonempty("É necessário que tenha um cooperador escolhido"),
    date: z.date(),
    period: z.enum(Period.values as ["morning", "night"]),
    reason: z.string(),
  });
  public initialValues(selectedDate: Date) {
    return {
      cooperator_id: "",
      date: getWedsnesdayAndSundaysInMonth(selectedDate)[0],
      period: Period.enum.night,
      reason: "",
    };
  }
}

export const exceptionForm = new ExceptionForm();
