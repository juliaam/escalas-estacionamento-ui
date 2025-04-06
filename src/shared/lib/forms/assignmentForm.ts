import { Period } from "@/shared/enums/period";
import { getWedsnesdayAndSundaysInMonth } from "@/shared/utils/getChurchDays";

export type AssignmentFormValues = {
  cooperator_id: string;
  date: Date;
  period: keyof typeof Period.enum;
  sector: string;
  reason?: string;
};

class AssignmentForm {
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
