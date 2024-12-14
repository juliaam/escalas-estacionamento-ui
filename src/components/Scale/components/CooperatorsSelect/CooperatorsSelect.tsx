import { ListCooperators } from "../ListCooperators";
import { cooperadores } from "@/mocks/constrainsts";
import { Minus, Plus, UserRoundCheck, UserX } from "lucide-react";
import { useState } from "react";
import { Button, Card, CardTitle } from "@/components";

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
          title={<CardTitle text="Escalados" icon={<UserRoundCheck />} />}
          cooperators={selectedCooperators}
          cooperatorContent={(cooperator) => (
            <Button
              size="icon"
              className="bg-red-500 hover:bg-red-700"
              onClick={() => {
                addCooperatorException(cooperator);
              }}
            >
              <Minus color="white" />
            </Button>
          )}
        />
        <span className="h-full w-[1px] bg-black"></span>
        <ListCooperators
          title={<CardTitle text="Não escalados" icon={<UserX />} />}
          cooperators={expectionCooperators}
          cooperatorContent={(cooperator) => (
            <Button
              className="bg-green-400 hover:bg-green-600"
              size="icon"
              onClick={() => {
                removeCooperatorsException(cooperator);
              }}
            >
              <Plus color="white" />
            </Button>
          )}
        />
      </div>
    </Card>
  );
}
