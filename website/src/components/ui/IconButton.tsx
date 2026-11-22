import React from "react";
import { cn } from "../../lib/utils";
import { Button, type ButtonProps } from "./Button";

export interface IconButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  icon: React.ReactNode;
  "aria-label": string;
  tooltip?: string;
  size?: "sm" | "md" | "lg" | "icon";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      "aria-label": ariaLabel,
      tooltip,
      size = "md",
      variant = "icon",
      ...props
    },
    ref
  ) => {
    const sizeMap: Record<string, string> = {
      sm: "size-11 p-0 text-xs sm:size-9",
      md: "size-11 p-0 text-sm sm:size-10",
      lg: "size-12 p-0 text-base",
      icon: "size-11 p-0 sm:size-10",
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        aria-label={ariaLabel}
        title={tooltip || ariaLabel}
        className={cn("rounded-full", sizeMap[size], className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
