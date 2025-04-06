import axios from "axios";
import { apiUrl } from "./base";
import { Sector } from "@/shared/types/Sector";

export class SectorService {
  private static path = "sector";

  static async list(): Promise<Sector[]> {
    const response = await axios.get(`${apiUrl}/${this.path}`);
    return response.data;
  }
}
