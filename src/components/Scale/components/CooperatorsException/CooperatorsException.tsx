import { TriangleAlert } from "lucide-react";

export const CooperatorsException = () => {
  return (
    <div className="h-[30rem] w-1/2 rounded-md border border-white bg-orange-400 p-4">
      <div className="flex items-center gap-x-4">
        <span className="text-4xl text-white">Exceções</span>
        <TriangleAlert size={44} color="white" />
      </div>
    </div>
  );
};
