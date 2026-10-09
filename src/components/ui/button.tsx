import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border-2 border-transparent bg-clip-padding font-bold whitespace-nowrap no-underline transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-forest-deep",
        outline: "border-primary bg-transparent text-primary hover:bg-secondary aria-expanded:bg-secondary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-ember-soft aria-expanded:bg-ember-soft",
        ghost: "text-ink hover:bg-secondary hover:text-primary aria-expanded:bg-secondary",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
        // Botones de donación (naranja del logotipo)
        donate: "bg-ember text-white shadow-soft hover:bg-ember-deep",
        "donate-outline": "border-ember bg-transparent text-ember hover:bg-ember-soft",
        light: "bg-cream text-ember-deep hover:bg-white",
      },
      size: {
        default: "min-h-12 gap-2 px-6 py-3 text-[1.0625rem] leading-tight",
        sm: "min-h-10 gap-1.5 px-4 py-2 text-[0.9rem]",
        lg: "min-h-14 gap-2 px-7 py-3.5 text-xl",
        icon: "size-12",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
