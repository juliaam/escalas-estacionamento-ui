import { ListCooperators } from "../ListCooperators";
import { cooperadores } from "@/shared/mocks/constrainsts";
import { Minus, UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { Card, CardTitle } from "@/components";
import { Button } from "@/components/ui";

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

  return (
    <Card>
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
    </Card>
  );
}
