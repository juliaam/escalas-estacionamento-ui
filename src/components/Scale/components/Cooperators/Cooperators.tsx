import { Card } from "@/components/Card/Card";
import { ListCooperators } from "./components/ListCooperators";
import { cooperadores } from "@/mocks/constrainsts";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export function CooperatorsSelect() {
  const [expectionCooperators, setExpectionCooperators] = useState<string[]>(
    []
  );

  const selectedCooperators = cooperadores.filter(
    (cooperator) => !expectionCooperators.includes(cooperator)
  );

  const addCooperatorException = (cooperator: string) => {
    setExpectionCooperators((prev) => [...prev, cooperator]);
  };

  const removeCooperatorsException = (cooperator: string) =>
    setExpectionCooperators((prev) =>
      prev.filter((prevCooperator) => prevCooperator !== cooperator)
    );

  return (
    <Card>
      <div className="grid grid-flow-col">
        <ListCooperators
          onClickButton={addCooperatorException}
          title="Pessoas escaladas"
          cooperators={selectedCooperators}
          actionIcon={<X size={18} color="white" />}
        />
        <span className="w-[1px] h-full bg-black"></span>
        <ListCooperators
          onClickButton={removeCooperatorsException}
          title="Pessoas não escaladas"
          cooperators={expectionCooperators}
          actionIcon={<Plus size={18} color="white" />}
        />
      </div>
    </Card>
  );
}
