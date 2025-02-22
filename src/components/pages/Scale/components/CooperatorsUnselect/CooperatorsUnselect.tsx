import { Card, CardTitle } from "@/components";
import { Button } from "@/components/ui";
import { ListCooperators } from "../ListCooperators";
import { Plus, UserX } from "lucide-react";

import { cooperadores } from "@/shared/mocks/constrainsts";

export function CooperatorUnselect() {
  return (
    <Card>
      <ListCooperators
        title={<CardTitle text="Não escalados" icon={<UserX />} />}
        cooperators={cooperadores}
        cooperatorContent={(cooperator) => (
          <Button
            className="bg-green-400 hover:bg-green-600"
            size="icon"
            onClick={() => {
              // removeCooperatorsException(cooperator);
            }}
          >
            <Plus color="white" />
          </Button>
        )}
      />
    </Card>
  );
}
