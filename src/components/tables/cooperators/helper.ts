import { Cooperator } from "@/shared/enums/cooperatorType";
import { Cooperator as CooperatorType } from "@/shared/types/Cooperator";

export type CooperatorTableData = {
  id: CooperatorType["id"];
  name: CooperatorType["name"];
  type: string;
  telephone: CooperatorType["telephone"];
};

export class CooperatorTable {
  static getTableData(data: CooperatorType[]): CooperatorTableData[] {
    return data.map((cooperator) => ({
      ...cooperator,
      telephone: cooperator.telephone || "Não possui",
      type: Cooperator.getLabel(cooperator.type as "COOPERATOR" | "DEACUN"),
    }));
  }
}
