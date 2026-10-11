import { useCallback, useState, type KeyboardEvent } from "react";

interface UseListNavigationOptions {
  items: { disabled?: boolean }[];
  /** Called with the active index on Enter or Space. */
  onSelect: (index: number) => void;
  loop?: boolean;
}

/**
 * keyboard nav for the list, focus stays on trigger. activeIndex pairs with aria-activedescendant.
 * escape not handled here on purpose — popup closing goes thru disclosure state, one place only.
 */
export const useListNavigation = ({
  items,
  onSelect,
  loop = true,
}: UseListNavigationOptions) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const findEnabled = useCallback(
    (start: number, step: 1 | -1) => {
      const count = items.length;
      for (let i = 0; i < count; i += 1) {
        let index = start + step * i;
        if (loop) index = (index + count) % count;
        else if (index < 0 || index >= count) return -1;
        if (!items[index]?.disabled) return index;
      }
      return -1;
    },
    [items, loop],
  );

  const first = useCallback(() => findEnabled(0, 1), [findEnabled]);
  const last = useCallback(
    () => findEnabled(items.length - 1, -1),
    [findEnabled, items.length],
  );

  const move = useCallback(
    (step: 1 | -1) => {
      setActiveIndex((current) => {
        if (current === -1) return step === 1 ? first() : last();
        const next = findEnabled(current + step, step);
        return next === -1 ? current : next;
      });
    },
    [findEnabled, first, last],
  );

  /** Returns true when the key was handled, so callers can decide what else to do. */
  const onKeyDown = useCallback(
    (event: KeyboardEvent): boolean => {
      switch (event.key) {
        case "ArrowDown":
          move(1);
          break;
        case "ArrowUp":
          move(-1);
          break;
        case "Home":
          setActiveIndex(first());
          break;
        case "End":
          setActiveIndex(last());
          break;
        case "Enter":
        case " ":
          if (activeIndex === -1 || items[activeIndex]?.disabled) return false;
          onSelect(activeIndex);
          break;
        default:
          return false;
      }
      event.preventDefault();
      return true;
    },
    [activeIndex, first, items, last, move, onSelect],
  );

  return { activeIndex, setActiveIndex, onKeyDown };
};
