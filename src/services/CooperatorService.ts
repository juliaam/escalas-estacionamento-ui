import { Cooperator } from "@/shared/types/Cooperator";
import axios from "axios";
import { apiUrl } from "./base";

export class CooperatorService {
  private static path = `${apiUrl}/cooperator`;

  static async list(): Promise<Cooperator[]> {
    const response = await axios.get(this.path);
    return response.data;
  }
  static async add(coop: Omit<Cooperator, "id">): Promise<Cooperator> {
    const response = await axios.post(this.path, coop);
    return response.data;
  }
}
