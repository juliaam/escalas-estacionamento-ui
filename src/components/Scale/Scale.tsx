import { Card } from "../Card/Card";

import { CooperatorsSelect } from "./components/Cooperators/Cooperators";

export function Scale() {
  return (
    <div className="w-full md:flex md:items-center md:gap-x-20 md:px-2 font-open-sans">
      <CooperatorsSelect />
      <Card>oi</Card>
      <Card>oi</Card>
    </div>
  );
}
