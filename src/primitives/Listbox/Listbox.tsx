import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { ListboxRoot, OptionCheck, OptionRoot } from "./Listbox.styles";

export interface ListboxProps extends HTMLAttributes<HTMLUListElement> {
  multiselectable?: boolean;
  children: ReactNode;
}

/**
 * ARIA listbox container. Focus stays on the owning trigger, which points
 * `aria-activedescendant` at the active Option's id.
 */
export const Listbox = forwardRef<HTMLUListElement, ListboxProps>(
  ({ multiselectable = false, children, ...rest }, ref) => (
    <ListboxRoot
      ref={ref}
      role="listbox"
      aria-multiselectable={multiselectable || undefined}
      {...rest}
    >
      {children}
    </ListboxRoot>
  ),
);

Listbox.displayName = "Listbox";

export interface OptionProps extends Omit<
  HTMLAttributes<HTMLLIElement>,
  "onSelect"
> {
  id: string;
  selected?: boolean;
  active?: boolean;
  disabled?: boolean;
  /** Show a checkbox-style indicator for multi-select lists. */
  showCheck?: boolean;
  children: ReactNode;
}

export const Option = forwardRef<HTMLLIElement, OptionProps>(
  (
    {
      id,
      selected = false,
      active = false,
      disabled = false,
      showCheck = false,
      children,
      ...rest
    },
    ref,
  ) => (
    <OptionRoot
      ref={ref}
      id={id}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      $active={active}
      $selected={selected}
      $disabled={disabled}
      {...rest}
    >
      {showCheck && <OptionCheck aria-hidden="true" $checked={selected} />}
      {children}
    </OptionRoot>
  ),
);

Option.displayName = "Option";
