import { CooperatorsException } from "./components/CooperatorsException/CooperatorsException";
import { CooperatorsSelect } from "./components/CooperatorsSelect/CooperatorsSelect";
import { CooperatorUnselect } from "./components/CooperatorsUnselect/CooperatorsUnselect";

export function Scale() {
  return (
    <div className="grid h-full gap-y-4 px-1 font-montserrat md:flex md:grid-cols-[33%_33%_33%] md:justify-center md:gap-x-20 md:px-20 md:py-4">
      <CooperatorsSelect />
      <CooperatorUnselect />
      <CooperatorsException />
    </div>
  );
}
