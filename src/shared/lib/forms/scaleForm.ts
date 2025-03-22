import { CooperatorId } from "@/shared/types/Cooperator";
import { Exception } from "@/shared/types/Exception";
import { format } from "date-fns";

export type CooperatorBodyForm = {
  id: string;
  exceptions: Exception[];
};

type SectorAssignmanets = {
  id: string;
  cooperators_ids: string[];
};

type AssignmentsCooperators = {
  date: Date;
  period: string; // enum posteriormente
  sector: SectorAssignmanets[];
};

export type ScaleFormValues = {
  name: string;
  date: string;
  cooperatorsIds: CooperatorId[];
  assignments: AssignmentsCooperators[];
  exceptions: Exception[];
};

class ScaleForm {
  public initialValues: ScaleFormValues = {
    name: "",
    date: format(new Date(), "yyyy-MM"),
    cooperatorsIds: [],
    exceptions: [],
    assignments: [],
  };
}

export const scaleForm = new ScaleForm();
