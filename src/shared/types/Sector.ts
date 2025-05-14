import { Sector as SectorENUM } from "../enums/sectorType";
import { SemNome } from "../enums/semNome";

export type Sector = {
  id: string;
  name: string;
  type: keyof typeof SectorENUM.enum;
  typeSemNome: keyof typeof SemNome.enum;
};
