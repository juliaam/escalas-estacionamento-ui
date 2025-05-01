import { Cooperator } from "@/shared/enums/cooperatorType";
import { Cooperator as CooperatorType } from "@/shared/types/Cooperator";

export type CooperatorTableType = Omit<CooperatorType, "telephone"> & {
  telephone: string;
};

export class CooperatorTable {
  static getTableData(data: CooperatorType[]): CooperatorTableType[] {
    return data.map((cooperator) => ({
      ...cooperator,
      telephone: cooperator.telephone || "Não possui",
      type: Cooperator.getLabel(cooperator.type as "COOPERATOR" | "DEACUN"),
    }));
  }
}
