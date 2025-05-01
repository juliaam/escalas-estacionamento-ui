import { z } from "zod";
import { Period } from "@/shared/enums/period";
import { getWedsnesdayAndSundaysInMonth } from "@/shared/utils/getChurchDays";

export type ScaleFormValues = z.infer<typeof scaleForm.validationSchema>;

class ScaleForm {
  public validationSchema = z.object({
    date: z.date(),
    cooperatorsIds: z.array(
      z.string().nonempty("ID do cooperador é obrigatório")
    ),
    assignments: z.array(
      z.object({
        cooperator_id: z
          .string()
          .nonempty("É necessário que tenha um cooperador escolhido"),
        date: z.date(),
        period: z.enum(Period.values as ["morning", "night"]),
        sector: z.string().nonempty("Setor é obrigatório"),
        reason: z.string().optional(),
      })
    ),
    exceptions: z.array(
      z.object({
        cooperator_id: z
          .string()
          .nonempty("É necessário que tenha um cooperador escolhido"),
        date: z.date(),
        period: z.enum(Period.values as ["morning", "night"]),
        reason: z.string().optional(),
      })
    ),
  });

  public initialValues: ScaleFormValues = {
    date: getWedsnesdayAndSundaysInMonth(new Date())[0],
    cooperatorsIds: [],
    assignments: [],
    exceptions: [],
  };
}

export const scaleForm = new ScaleForm();
