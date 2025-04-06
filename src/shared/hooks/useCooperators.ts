import { useState } from "react";
import { CooperatorService } from "@/services/CooperatorService";
import { Cooperator } from "../types/Cooperator";

export function useCooperators() {
  const [data, setData] = useState<Cooperator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCooperators() {
    try {
      setIsLoading(true);
      const result = await CooperatorService.list();
      setData(result);
      return result;
    } catch (error) {
      console.error("Erro ao buscar cooperadores:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, isLoading, fetchCooperators };
}
