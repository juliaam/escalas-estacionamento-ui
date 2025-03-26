import { Period } from "@/shared/enums/period";
import { getWedsnesdayAndSundaysInMonth } from "@/shared/utils/getChurchDays";

export type ExceptionsFormValues = {
  cooperator_id: string;
  date: Date;
  period: keyof typeof Period.enum;
  reason: string;
};

class ExceptionForm {
  public initialValues(selectedDate: Date) {
    return {
      cooperator_id: "",
      date: getWedsnesdayAndSundaysInMonth(selectedDate)[0],
      period: Period.enum.day,
      reason: "",
    };
  }
}

export const exceptionForm = new ExceptionForm();
