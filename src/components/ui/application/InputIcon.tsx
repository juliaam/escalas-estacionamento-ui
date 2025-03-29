import { cn } from "@/shared/utils/twMerge";
import { ChangeEvent, ReactElement } from "react";

export type InputIcon = {
  placeholder: string;
  icon: ReactElement;
  className?: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const InputIcon = ({
  onChange,
  value,
  placeholder,
  icon,
  className,
}: InputIcon) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-gray-400 px-3 py-1.5",
        className
      )}
    >
      {icon}
      <input
        onChange={onChange}
        value={value}
        className={cn(
          "flex-1 border-0 bg-transparent p-0 text-sm outline-none",
          className
        )}
        placeholder={placeholder}
      />
    </div>
  );
};
