import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "mb-4 text-sm font-medium uppercase tracking-[0.14em] text-steel",
        className,
      )}
    >
      {children}
    </p>
  );
}
