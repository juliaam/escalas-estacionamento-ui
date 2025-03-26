import { mockCooperators } from "@/shared/mocks/mockCooperators";
import { Assignments } from "@/shared/types/Assignaments";
import { Cooperator } from "@/shared/types/Cooperator";
import { Exception } from "@/shared/types/Exception";
import { format } from "date-fns";

export type CooperatorBodyForm = {
  id: string;
  exceptions: Exception[];
};

type SectorAssignments = {
  id: string;
  cooperators_ids: string[];
};

export type AssignmentsCooperators = {
  cooperator_id: Cooperator["id"];
  date: Date;
  period: string; // enum posteriormente
  sector: SectorAssignments[];
};

export type ScaleFormValues = {
  name: string;
  date: Date;
  cooperatorsIds: Cooperator["id"][];
  assignments: AssignmentsCooperators[];
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
