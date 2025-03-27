import { cn } from "@/shared/utils/twMerge";
import { ReactElement } from "react";

type CardInfoProps = {
  title: string;
  info: string;
  icon: ReactElement;
  className?: string;
};

export const CardInfo = ({ title, info, icon, className }: CardInfoProps) => {
  return (
    <div
      className={cn(
        "flex size-full justify-between rounded-md p-3 text-white",
        className
      )}
    >
      <div className="flex flex-col">
        <span className="text-opacity-90">{title}</span>
        <span>{info}</span>
      </div>
      <span>{icon}</span>
    </div>
  );
};
