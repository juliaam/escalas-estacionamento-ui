import { AppInputSearch, Button } from "@/components/ui";
import { coopsList } from "@/shared/mocks/cooperatorsList";
import { ThumbsDown, ThumbsUp, Users2, X } from "lucide-react";

export const CooperatorsChoose = () => {
  return (
    <div className="grid h-full w-1/2 gap-y-4 rounded-md bg-zinc-200 p-6">
      <div className="grid gap-y-3">
        <div className="flex items-center gap-x-2">
          <span className="text-3xl">
            Selecione os cooperadores que serão escalados
          </span>
          <Users2 size={34} />
        </div>
        <div className="w-1/2">
          <AppInputSearch
            className="text-md border-gray-600 bg-zinc-50 placeholder:text-gray-600"
            onChangeValue={() => ""}
          />
        </div>
      </div>
      <div className="flex rounded-md">
        <div className="flex w-full flex-col gap-y-2">
          <div className="flex h-full w-full items-center justify-center gap-x-2">
            <span className="text-2xl">Escalados</span>
            <ThumbsUp size={22} />
          </div>
          <div className="flex flex-col gap-1">
            {coopsList.map((coop) => {
              return (
                <div className="flex items-center justify-between rounded-md border-b bg-zinc-50 px-4 py-2">
                  <span>{coop.name}</span>
                  <Button
                    size="sm"
                    className="bg-red-500 transition-all hover:border hover:border-red-500 hover:bg-white hover:text-red-500"
                  >
                    Remover <X />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-4 mt-[5%] block h-[90%] w-[1px] bg-black" />
        <div className="flex w-full flex-col gap-y-2">
          <div className="flex items-center justify-center gap-x-2">
            <span className="text-2xl">Não Escalados</span>
            <ThumbsDown size={22} className="text-black" />
          </div>
          <div className="flex flex-col gap-1">
            {Array.from({ length: 6 }, (_, index) => (
              <div className="flex items-center justify-between rounded-md bg-zinc-50 px-4 py-2">
                <span>{`bobo${index}`}</span>
                <Button
                  size="sm"
                  className="bg-green-500 transition-all hover:border hover:border-green-500 hover:bg-white hover:text-green-500"
                >
                  Escalar <X />
                </Button>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
