import { SemNome } from "../enums/semNome";
import { Sector } from "../types/Sector";

export const getStandingOrSeatedSectors = (sectors: Sector[]) =>
  sectors.reduce<{
    seated: Sector[];
    standing: Sector[];
  }>(
    (acc, cur) => {
      if (cur.typeSemNome === SemNome.enum.seated) {
        acc.seated.push(cur);
      } else {
        acc.standing.push(cur);
      }
      return acc;
    },
    { seated: [], standing: [] }
  );
