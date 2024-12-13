import { ListCooperators } from "../ListCooperators";
import { cooperadores } from "@/mocks/constrainsts";
import { Minus, Plus, UserRoundCheck, UserX } from "lucide-react";
import { useState } from "react";
import { Card, CardTitle } from "@/components/Card";

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
      <div className="grid grid-flow-col gap-x-3">
        <ListCooperators
          onClickButton={addCooperatorException}
          title={<CardTitle text="Escalados" icon={<UserRoundCheck />} />}
          cooperators={selectedCooperators}
          actionIcon={<Minus color="white" />}
          classNameButton="bg-red-500 hover:bg-red-700"
        />
        <span className="h-full w-[1px] bg-black"></span>
        <ListCooperators
          onClickButton={removeCooperatorsException}
          title={<CardTitle text="Não escalados" icon={<UserX />} />}
          cooperators={expectionCooperators}
          actionIcon={<Plus color="white" />}
          classNameButton="bg-green-400 hover:bg-green-600"
        />
      </div>
    </Card>
  );
}
