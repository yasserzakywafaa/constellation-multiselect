import { forwardRef, type HTMLAttributes } from "react";
import { Box } from "./InputBox.styles";

export interface InputBoxProps extends HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
  disabled?: boolean;
}

/**
 * Presentation-only frame for a control. It uses :focus-within, so whatever sits inside
 * (a combobox trigger, an <input>, tags) can own focus while the box shows the ring.
 */
export const InputBox = forwardRef<HTMLDivElement, InputBoxProps>(
  ({ invalid = false, disabled = false, children, ...rest }, ref) => (
    <Box
      ref={ref}
      $invalid={invalid}
      $disabled={disabled}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </Box>
  ),
);

InputBox.displayName = "InputBox";
