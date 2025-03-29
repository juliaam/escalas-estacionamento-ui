import { Period } from "@/shared/enums/period";
import { mockCooperators } from "@/shared/mocks/mockCooperators";
import { Cooperator } from "@/shared/types/Cooperator";
import { Exception } from "@/shared/types/Exception";
import { AssignmentFormValues } from "./assignmentForm";

export type CooperatorBodyForm = {
  id: string;
  exceptions: Exception[];
};

export type SectorAssignments = {
  id: string;
  cooperators_ids: string[];
};

export type AssignmentsCooperators = {
  cooperator_id: Cooperator["id"];
  date: Date;
  period: keyof typeof Period.enum;
  sector: SectorAssignments[];
};

export type ScaleFormValues = {
  name: string;
  date: Date;
  cooperatorsIds: Cooperator["id"][];
  assignments: AssignmentFormValues[];
  exceptions: Exception[];
};

class ScaleForm {
  public initialValues: ScaleFormValues = {
    name: "",
    date: new Date(),
    cooperatorsIds: mockCooperators.map((coop) => coop.id),
    exceptions: [],
    assignments: [],
  };
}

export const scaleForm = new ScaleForm();
