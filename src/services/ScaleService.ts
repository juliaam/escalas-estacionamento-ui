import axios from "axios";
import { apiUrl } from "./base";
import { ScaleGenerateBody } from "@/shared/types/ScaleGenerateBody";
import { ScaleResult } from "@/shared/types/ScaleResult";

export class ScaleService {
  private static path = "scale";

  static async generate(body: ScaleGenerateBody): Promise<ScaleResult> {
    const response = await axios.post(`${apiUrl}/${this.path}`, body);
    return response.data;
  }
}
