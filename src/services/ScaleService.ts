import axios from "axios";
import { apiUrl } from "./base";
import { ScaleGenerateBody } from "@/shared/types/ScaleGenerateBody";

export class ScaleService {
  private static path = "scale";

  static async generate(body: ScaleGenerateBody): Promise<any> {
    return await axios.post(`${apiUrl}/${this.path}/generate`, body);
  }
}
