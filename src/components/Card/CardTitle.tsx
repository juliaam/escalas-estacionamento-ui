import { ReactNode } from "react";

export interface CardTitleProps {
  text: string;
  icon: ReactNode;
}

export function CardTitle({ text, icon }: CardTitleProps) {
  return (
    <div className="flex justify-center gap-x-2 px-2">
      <span className="text-xl font-medium">{text}</span>
      <span>{icon}</span>
    </div>
  );
}
