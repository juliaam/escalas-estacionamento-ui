import { Period } from "../enums/period";
import { Sector } from "../enums/sectorType";
import { Cooperator } from "./Cooperator";

export type SectorResult = {
  name: string;
  id_scale: string;
  id_sector: string;
  type: keyof typeof Sector.enum;
  cooperators: Pick<Cooperator, "id" | "name">[];
};

export type ScaleResult = {
  id: string;
  id_group_scale: string;
  period: keyof typeof Period.enum;
  date: string;
  sectors: SectorResult[];
};
