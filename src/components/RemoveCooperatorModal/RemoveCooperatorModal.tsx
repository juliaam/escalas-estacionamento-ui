import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

type RemoveCooperatorModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const RemoveCooperatorModal = ({
  isOpen,
  setIsOpen,
}: RemoveCooperatorModalProps) => {
  const onCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover cooperador</DialogTitle>
        </DialogHeader>
        Tem certeza que deseja excluir o cooperador?
        <DialogFooter className="flex justify-center">
          <Button variant="outline" onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button variant="destructive" type="submit">
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
