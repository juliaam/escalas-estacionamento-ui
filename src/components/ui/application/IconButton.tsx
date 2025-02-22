import { Button, ButtonProps } from "@/components/ui";
import { cn } from "@/shared/lib/utils";
import { forwardRef, LegacyRef, ReactElement } from "react";

type IconButtonProps = Omit<ButtonProps, "size"> & {
  icon: ReactElement;
  size?: number | string;
  className?: string;
};

export const AppIconButton = forwardRef(
  (
    { variant = "ghost", icon, size, className, ...props }: IconButtonProps,
    ref: LegacyRef<HTMLButtonElement>
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size="icon"
        className={cn(`[&_svg]:size-${String(size)}`, className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);
