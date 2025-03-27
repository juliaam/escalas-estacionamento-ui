import { Period } from "../enums/period";
import { Sector } from "../enums/sectorType";
import { Cooperator } from "./Cooperator";

export type SectorResult = {
  id_scale: string;
  id_sector: string;
  type: keyof typeof Sector.enum;
  cooperators: Cooperator["id"][];
};

export type ScaleResult = {
  id: string;
  id_group_scale: string;
  period: keyof typeof Period.enum;
  date: string;
  sectors: SectorResult[];
};
