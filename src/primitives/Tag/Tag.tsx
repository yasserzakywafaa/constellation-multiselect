import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { RemoveButton, TagLabel, TagRoot } from "./Tag.styles";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** When set, a remove button is shown. */
  onRemove?: () => void;
  /** Accessible name for the remove button. Defaults to "Remove {children}" for text labels. */
  removeLabel?: string;
  disabled?: boolean;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, onRemove, removeLabel, disabled = false, ...rest }, ref) => {
    const label =
      removeLabel ??
      (typeof children === "string" ? `Remove ${children}` : "Remove");
    return (
      <TagRoot ref={ref} $disabled={disabled} {...rest}>
        <TagLabel>{children}</TagLabel>
        {onRemove && (
          <RemoveButton
            type="button"
            aria-label={label}
            disabled={disabled}
            // Keep focus where it is (e.g. on a combobox) when the chip is clicked.
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              // Don't let the click reach a parent that toggles the popover.
              event.stopPropagation();
              onRemove();
            }}
          >
            <span aria-hidden="true">×</span>
          </RemoveButton>
        )}
      </TagRoot>
    );
  },
);

Tag.displayName = "Tag";
