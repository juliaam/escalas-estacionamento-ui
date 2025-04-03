import { Cooperator } from "@/shared/types/Cooperator";
import { mockCooperators } from "@/shared/mocks/mockCooperators";
import axios from "axios";
import { apiUrl } from "./base";

export class CooperatorService {
  private static path = "cooperator";

  static async list(): Promise<Cooperator[]> {
    console.log(this.path);
    return mockCooperators;
    // return await axios.ge(`${apiUrl}/${this.path}`);
  }
}
