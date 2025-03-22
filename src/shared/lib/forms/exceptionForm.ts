import { Period } from "@/shared/enums/period";

export type ExceptionsFormValues = {
  cooperator_id: string;
  date: Date;
  period: keyof typeof Period.enum;
  reason: string;
};

class ExceptionForm {
  public initialValues: ExceptionsFormValues = {
    cooperator_id: "",
    date: new Date(),
    period: Period.enum.day,
    reason: "",
  };
}

export const exceptionForm = new ExceptionForm();
