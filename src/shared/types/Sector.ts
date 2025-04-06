import { Sector as SectorENUM } from "../enums/sectorType";

export type Sector = {
  id: string;
  name: string;
  quantity: number;
  type: keyof typeof SectorENUM.enum;
};
