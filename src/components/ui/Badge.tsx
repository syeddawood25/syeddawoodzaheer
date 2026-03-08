import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-mono",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary/10 text-primary",
                secondary:
                    "border-transparent bg-secondary/10 text-secondary",
                destructive:
                    "border-transparent bg-red-500/10 text-red-500",
                outline:
                    "text-[var(--muted)] border border-[var(--border)] hover:border-primary/50 hover:text-primary",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
