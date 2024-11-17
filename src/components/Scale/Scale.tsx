import { Plus, X } from "lucide-react";
import { cooperadores, outrosCooperadores } from "../../mocks/constrainsts";
import { Card } from "../Card/Card";
import { ListCooperators } from "./components/ListCooperators";

import { Input } from "@/components/ui/input";

export function Scale() {
  return (
    <div className="w-full md:flex md:items-center md:gap-x-20 md:px-2 font-open-sans">
      <Card>
        <div className="grid grid-cols-2 grid-flow-col ">
          <div className="max-h-[30rem] overflow-auto scroll-smooth flex flex-col">
            <span className="text-lg">Pessoas escaladas</span>
            <Input placeholder="Pesquise..." />
            <div className="flex flex-col">
              <ListCooperators
                cooperators={cooperadores}
                actionIcon={<Plus size={18} />}
              />
            </div>
          </div>
          <div>
            <span className="text-xl">Pessoas não escaladas</span>
            <div className="flex flex-col">
              <ListCooperators
                cooperators={outrosCooperadores}
                actionIcon={<X size={18} />}
              />
            </div>
          </div>
        </div>
      </Card>
      <Card>oi</Card>
      <Card>oi</Card>
    </div>
  );
}
