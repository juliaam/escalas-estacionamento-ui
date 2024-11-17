import { ReactNode } from "react";

export function ListCooperators({
  cooperators,
  actionIcon,
}: {
  cooperators: string[];
  actionIcon: ReactNode;
}) {
  return (
    <>
      {cooperators.map((cooperator) => {
        return (
          <div className="w-full flex justify-between border-b-black border-b p-1 ">
            <span>{cooperator}</span>
            <button className="border border-gray-800 rounded-md px-1 py-1 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200">
              {actionIcon}
            </button>
          </div>
        );
      })}
    </>
  );
}
