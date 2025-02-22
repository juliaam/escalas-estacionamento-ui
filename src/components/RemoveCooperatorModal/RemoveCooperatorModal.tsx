import {
  Dialog,
  DialogClose,
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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover cooperador</DialogTitle>
        </DialogHeader>
        Algo para remover cooperador
        <DialogFooter>
          <DialogClose />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
