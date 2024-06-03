import { clsx } from "@lib/utils/clsx";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

export type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "solid" | "outline";
  color?: "primary" | "accent" | "highlight";
};

function colors({
  variant = "solid",
  color = "primary",
}: Pick<ButtonProps, "variant" | "color">) {
  if (variant === "outline") {
    const borderColor = (() => {
      switch (color) {
        case "primary":
          return "border-primary text-text";
        case "accent":
          return "border-accent text-text";
        case "highlight":
          return "border-highlight text-text";
      }
    })();
    return clsx(borderColor, "border-thick");
  }

  switch (color) {
    case "primary":
      return "bg-primary text-primary-contrast";
    case "accent":
      return "bg-accent text-accent-contrast";
    case "highlight":
      return "bg-highlight text-highlight-contrast";
  }
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        className={clsx(colors(props), "rounded p mt-2 shadow-sm", className)}
        whileFocus={{ translateY: "-0.4rem" }}
        whileHover={{
          translateY: "-0.4rem",
        }}
        whileTap={{ translateY: "-0.2rem" }}
        ref={ref}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";
