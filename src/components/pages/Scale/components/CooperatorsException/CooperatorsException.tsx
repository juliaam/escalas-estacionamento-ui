import { useState } from "react";
import { MessageSquareWarning, Plus } from "lucide-react";
import { ListCooperators } from "../ListCooperators";
import { ExceptionForm } from "@/components/pages/Scale/components/CooperatorsException/components";
import { Card, CardTitle } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/ui";
import { cooperadores } from "@/shared/mocks/constrainsts";

export interface CooperatorsExceptionProps {}

export function CooperatorsException({}: CooperatorsExceptionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Card>
      <CardTitle text="Lista de excessões" icon={<MessageSquareWarning />} />
      <Button
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <span>Adicionar</span>
        <Plus />
      </Button>
      <ListCooperators cooperators={cooperadores} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar excessão</DialogTitle>
            <DialogDescription>
              Selecione o cooperador e a data para criar uma excessão
            </DialogDescription>
          </DialogHeader>
          <ExceptionForm />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
