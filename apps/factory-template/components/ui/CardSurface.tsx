import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type CardSurfaceProps = {
  children: ReactNode;
  className?: string;
  accent?: boolean;
};

export function CardSurface({ children, className, accent }: CardSurfaceProps) {
  return (
    <div
      className={cn(
        "surface-panel p-6 md:p-8",
        accent && "surface-panel-accent",
        "hover-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
