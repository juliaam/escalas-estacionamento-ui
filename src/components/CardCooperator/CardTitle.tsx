import { ReactNode } from "react";

export interface CardCooperatorTitleProps {
  text: string;
  icon: ReactNode;
}

export function CardCooperatorTitle({ text, icon }: CardCooperatorTitleProps) {
  return (
    <div className="flex items-center justify-center gap-x-2 px-2">
      <span className="text-xl font-medium">{text}</span>
      <span>{icon}</span>
    </div>
  );
}
