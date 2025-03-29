import { Cooperator } from "@/shared/types/Cooperator";
import { mockCooperators } from "@/shared/mocks/mockCooperators";

export class CooperatorService {
  private static path = "cooperator";

  static async list(): Promise<Cooperator[]> {
    console.log(this.path);
    return mockCooperators;
    // return await axios.get(`${apiUrl}/${this.path}`);
  }
}
