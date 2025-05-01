import { Period } from "../enums/period";
import { Cooperator } from "./Cooperator";

export type Exception = {
  cooperator_id: Cooperator["id"];
  date: Date;
  period: keyof typeof Period.enum;
  reason?: string;
};
