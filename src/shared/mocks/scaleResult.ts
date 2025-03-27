import { Sector } from "../enums/sectorType";
import { Period } from "../enums/period";
import { v4 as uuidv4 } from "uuid";

export const scaleResult = [
  {
    date: new Date().toISOString(),
    id: uuidv4(),
    id_group_scale: uuidv4(),
    period: Period.enum.day,
    sectors: [
      {
        cooperators: [],
        id_scale: uuidv4(),
        id_sector: uuidv4(),
        type: Sector.enum.in,
      },
    ],
  },
];
