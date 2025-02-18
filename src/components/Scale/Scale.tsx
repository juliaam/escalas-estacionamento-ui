import {
  CooperatorsSelect,
  CooperatorUnselect,
  CooperatorsException,
} from "@/components/Scale/components";
import { Button } from "@/components/ui";

export function Scale() {
  return (
    <div className="flex flex-col">
      <div className="grid h-full gap-y-4 px-1 font-montserrat md:flex md:grid-cols-[33%_33%_33%] md:justify-center md:gap-x-20 md:px-20 md:py-4">
        <CooperatorsSelect />
        <CooperatorUnselect />
        <CooperatorsException />
      </div>
      <Button>Gerar</Button>
    </div>
  );
}
