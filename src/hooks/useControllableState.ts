import { useCallback, useRef, useState } from "react";

interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

/**
 * Lets a component be controlled (`value` given) or uncontrolled (`defaultValue`),
 * like native form elements. `onChange` fires in both modes.
 */
export const useControllableState = <T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>) => {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setState = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [current, setState] as const;
};
