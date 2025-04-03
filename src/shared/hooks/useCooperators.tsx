import { useEffect, useState } from "react";
import { CooperatorService } from "@/services/CooperatorService";
import { Cooperator } from "../types/Cooperator";

export function useCooperators() {
  const [data, setData] = useState<Cooperator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCooperators() {
      try {
        const result = await CooperatorService.list();
        setData(result);
      } catch (error) {
        console.error("Erro ao buscar cooperadores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCooperators();
  }, []);

  return { data, loading };
}
