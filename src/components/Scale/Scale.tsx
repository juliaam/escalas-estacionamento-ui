import { CooperatorsException } from "./components/CooperatorsException/CooperatorsException";
import { CooperatorsSelect } from "./components/CooperatorsSelect/CooperatorsSelect";

export function Scale() {
  return (
    <div className="grid gap-y-4 px-1 font-montserrat md:mt-20 md:flex md:items-center md:justify-center md:gap-x-20 md:px-2">
      <CooperatorsSelect />
      <CooperatorsException />
    </div>
  );
}
