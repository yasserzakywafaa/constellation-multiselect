import { useCallback, useState } from "react";

interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * Open/closed state for popovers, dialogs, etc. Components call `close` from
 * their Escape handling, so dismissal goes through this one place.
 */
export const useDisclosure = ({
  defaultOpen = false,
  onOpen,
  onClose,
}: UseDisclosureOptions = {}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(
    () => (isOpen ? close() : open()),
    [isOpen, open, close],
  );

  /** Matches Popover's `onOpenChange` signature. */
  const setOpen = useCallback(
    (next: boolean) => (next ? open() : close()),
    [open, close],
  );

  return { isOpen, open, close, toggle, setOpen };
};
