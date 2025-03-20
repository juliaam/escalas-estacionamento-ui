import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

interface CardCooperatorProps {
  children: ReactNode;
  className?: string;
}

export function CardCooperator({ children, className }: CardCooperatorProps) {
  return (
    <div
      className={cn(
        "h-full max-h-[50rem] w-full overflow-auto rounded-sm bg-zinc-100 px-6 py-4",
        className
      )}
    >
      {children}
    </div>
  );
}
