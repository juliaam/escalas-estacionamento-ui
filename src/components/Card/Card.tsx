import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`w-full overflow-auto rounded-sm bg-zinc-100 px-10 py-4 ${className}`}
    >
      {children}
    </div>
  );
}
