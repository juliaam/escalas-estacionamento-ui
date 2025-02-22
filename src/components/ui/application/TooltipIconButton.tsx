import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { AppIconButton, AppIconButtonProps } from "@/components/ui/application";
import { ReactNode } from "react";

type AppTooltipIconButtonProps = AppIconButtonProps & {
  tooltip: ReactNode;
  delayDuration?: number;
};

export const AppTooltipIconButton = ({
  tooltip,
  icon,
  delayDuration,
  ...props
}: AppTooltipIconButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger>
          <AppIconButton icon={icon} {...props} />
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
