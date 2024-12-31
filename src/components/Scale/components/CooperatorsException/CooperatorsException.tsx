import { useState } from "react";
import { MessageSquareWarning, Plus } from "lucide-react";
import { ListCooperators } from "../ListCooperators";
import { ExceptionForm } from "./components/ExceptionForm";
import {
  Card,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components";
import { cooperadores } from "@/mocks/constrainsts";

export interface CooperatorsExceptionProps {}

export function CooperatorsException({}: CooperatorsExceptionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Card className="grid gap-y-4">
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
