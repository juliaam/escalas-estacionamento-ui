import { Dialog, DialogContent } from "@/components/ui";
import { DialogProps } from "@radix-ui/react-dialog";

type ModalAddCooperatorsProps = DialogProps;

export const ModalAddCooperators = ({ ...props }: ModalAddCooperatorsProps) => {
  return (
    <Dialog {...props}>
      <DialogContent>teste</DialogContent>
    </Dialog>
  );
};
