import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

type EditCooperatorModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const EditCooperatorModal = ({
  isOpen,
  setIsOpen,
}: EditCooperatorModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar cooperador</DialogTitle>
        </DialogHeader>
        Algo para alterar cooperador
        <DialogFooter>
          <DialogClose />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
