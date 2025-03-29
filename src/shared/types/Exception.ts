import { Cooperator } from "./Cooperator";

export type Exception = {
  cooperator_id: Cooperator["id"];
  date: Date;
  period: string;
  reason?: string;
};
