import axios from "axios";
import { apiUrl } from "./base";
import { Cooperator } from "@/shared/types/Cooperator";
import { mockCooperators } from "@/shared/mocks/mockCooperators";

export class CooperatorService {
  private static path = "cooperator";

  static async list(): Promise<Cooperator[]> {
    return mockCooperators;
    // return await axios.get(`${apiUrl}/${this.path}`);
  }
}
