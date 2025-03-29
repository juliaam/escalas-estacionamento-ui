import { Cooperator } from "./Cooperator";
import { Sector } from "./Sector";

export type SectorGenerateBody = {
  id: Sector["id"];
};

export type AssignmentGenerateBody = {
  date: string;
  period: string;
  sector: SectorGenerateBody[];
};

export type ExceptionGenerateBody = {
  date: string;
  period: string;
  reason?: string;
};

export type CooperatorGenerateBody = {
  id_coop: Cooperator["id"];
  exceptions: ExceptionGenerateBody[];
  assignments: AssignmentGenerateBody[];
};

export type ScaleGenerateBody = {
  name: string;
  date: string;
  cooperators: CooperatorGenerateBody[];
};
