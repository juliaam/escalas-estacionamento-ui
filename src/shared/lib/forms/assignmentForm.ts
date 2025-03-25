import { Period } from "@/shared/enums/period";

export type AssignmentFormValues = {
  cooperator_id: string;
  date: Date;
  period: keyof typeof Period.enum;
  reason: string;
};

class AssignmentForm {
  public initialValues: AssignmentFormValues = {
    cooperator_id: "",
    date: new Date(),
    period: Period.enum.day,
    reason: "",
  };
}

export const assignmentForm = new AssignmentForm();
