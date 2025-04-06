import { useState } from "react";
import { SectorService } from "@/services/SectorService";
import { Sector } from "../types/Sector";

export function useSectors() {
  const [data, setData] = useState<Sector[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchSectors() {
    try {
      setIsLoading(true);
      const result = await SectorService.list();
      setData(result);
      return result;
    } catch (error) {
      console.error("Erro ao buscar setores:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, isLoading, fetchSectors };
}
