import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`h-full rounded-md border border-zinc-500 bg-main-white px-6 py-4 ${className}`}
    >
      {children}
    </div>
  );
}
