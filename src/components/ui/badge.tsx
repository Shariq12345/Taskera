import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TaskStatus } from "@/features/tasks/types";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-md",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:shadow-md",
        outline: "text-foreground border border-gray-200 hover:bg-gray-100",
        [TaskStatus.TODO]:
          "border-transparent bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:shadow",
        [TaskStatus.IN_PROGRESS]:
          "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow",
        [TaskStatus.IN_REVIEW]:
          "border-transparent bg-purple-100 text-purple-700 hover:bg-purple-200 hover:shadow",
        [TaskStatus.DONE]:
          "border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:shadow",
        [TaskStatus.BACKLOG]:
          "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, icon, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="text-lg">{icon}</span>}
      <span>{props.children}</span>
    </div>
  );
}

export { Badge, badgeVariants };
