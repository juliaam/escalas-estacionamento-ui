import { AppIconButton } from "@/components/ui/application";
import { Wrench, X } from "lucide-react";

export const CooperatorsActions = () => {
  return (
    <div>
      <AppIconButton icon={<Wrench />} />
      <AppIconButton icon={<X />} />
    </div>
  );
};
