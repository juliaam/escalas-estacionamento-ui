import { CooperatorsChoose } from "./components/CooperatorsChoose/CooperatorsChoose";
import { CooperatorsException } from "./components/CooperatorsException/CooperatorsException";

export function Scale() {
  return (
    <div className="flex flex-col gap-4 py-5">
      <div className="flex justify-between gap-x-4">
        <CooperatorsChoose />
        <CooperatorsException />
      </div>
    </div>
  );
}
