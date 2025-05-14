import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type SectorSelectorProps = {
  standing: { id: string; name: string }[];
  seated: { id: string; name: string }[];
  selectedStanding: string[];
  setSelectedStanding: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSeated: string[];
  setSelectedSeated: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SectorSelector = ({
  standing,
  seated,
  selectedStanding,
  setSelectedStanding,
  selectedSeated,
  setSelectedSeated,
}: SectorSelectorProps) => {
  const handleToggleAll = (type: "standing" | "seated") => {
    if (type === "standing") {
      if (selectedStanding.length === standing.length) {
        setSelectedStanding([]);
      } else {
        setSelectedStanding(standing.map((sector) => sector.id));
      }
    } else {
      if (selectedSeated.length === seated.length) {
        setSelectedSeated([]);
      } else {
        setSelectedSeated(seated.map((sector) => sector.id));
      }
    }
  };

  const handleToggleSector = (id: string, type: "standing" | "seated") => {
    if (type === "standing") {
      setSelectedStanding((prev) =>
        prev.includes(id)
          ? prev.filter((sectorId) => sectorId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedSeated((prev) =>
        prev.includes(id)
          ? prev.filter((sectorId) => sectorId !== id)
          : [...prev, id]
      );
    }
  };

  const isAllSelected = (type: "standing" | "seated") => {
    if (type === "standing") {
      return standing.length > 0 && selectedStanding.length === standing.length;
    } else {
      return seated.length > 0 && selectedSeated.length === seated.length;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="p-2">
        <CardTitle className="text-md font-medium">Exceção fixa</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium">Em pé</h3>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isAllSelected("standing")}
                  onCheckedChange={() => handleToggleAll("standing")}
                />
                <Label className="cursor-pointer text-xs font-normal">
                  Selecionar Todos
                </Label>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-4 gap-x-4 gap-y-2">
              {standing.map((sector) => (
                <div
                  key={sector.id}
                  className={`flex items-center rounded-md border p-2 transition-colors ${
                    selectedStanding.includes(sector.id)
                      ? "border-primary/30 bg-primary/10"
                      : "border-muted hover:bg-muted/30"
                  }`}
                >
                  <Checkbox
                    checked={selectedStanding.includes(sector.id)}
                    onCheckedChange={() =>
                      handleToggleSector(sector.id, "standing")
                    }
                    className="mr-2"
                  />
                  <Label className="w-full cursor-pointer text-xs font-normal">
                    {sector.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium">Sentado</h3>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isAllSelected("seated")}
                  onCheckedChange={() => handleToggleAll("seated")}
                />
                <Label className="cursor-pointer text-xs font-normal">
                  Selecionar Todos
                </Label>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-4 gap-x-4 gap-y-2">
              {seated.map((sector) => (
                <div
                  key={sector.id}
                  className={`flex items-center rounded-md border p-2 transition-colors ${
                    selectedSeated.includes(sector.id)
                      ? "border-primary/30 bg-primary/10"
                      : "border-muted hover:bg-muted/30"
                  }`}
                >
                  <Checkbox
                    checked={selectedSeated.includes(sector.id)}
                    onCheckedChange={() =>
                      handleToggleSector(sector.id, "seated")
                    }
                    className="mr-2"
                  />
                  <Label className="w-full cursor-pointer text-xs font-normal">
                    {sector.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
