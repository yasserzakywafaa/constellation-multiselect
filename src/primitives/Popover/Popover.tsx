import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { Panel } from "./Popover.styles";

export type PopoverPlacement =
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top-end";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Element the panel is positioned against (usually the trigger or its InputBox). */
  anchorRef: RefObject<HTMLElement | null>;
  placement?: PopoverPlacement;
  /** Gap between anchor and panel, in px. */
  offset?: number;
  /** Stretch the panel to the anchor's width (handy for selects). */
  matchAnchorWidth?: boolean;
}

const computePosition = (
  anchor: DOMRect,
  placement: PopoverPlacement,
  offset: number,
  matchWidth: boolean,
): CSSProperties => {
  const [side, align] = placement.split("-") as [
    "top" | "bottom",
    "start" | "end",
  ];
  const style: CSSProperties = {};
  if (side === "bottom") style.top = anchor.bottom + offset;
  else style.bottom = window.innerHeight - anchor.top + offset;
  if (align === "start") style.left = anchor.left;
  else style.right = window.innerWidth - anchor.right;
  if (matchWidth) style.width = anchor.width;
  return style;
};

/**
 * Floating panel rendered in a portal, so `overflow: hidden` ancestors can't clip it.
 * It owns positioning and outside-click dismissal only. Escape is left to the caller's
 * disclosure state, so dismissal on Escape lives in exactly one place.
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      open,
      onOpenChange,
      anchorRef,
      placement = "bottom-start",
      offset = 4,
      matchAnchorWidth = true,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<CSSProperties>({});

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        panelRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const updatePosition = useCallback(() => {
      const anchor = anchorRef.current;
      if (anchor)
        setPosition(
          computePosition(
            anchor.getBoundingClientRect(),
            placement,
            offset,
            matchAnchorWidth,
          ),
        );
    }, [anchorRef, placement, offset, matchAnchorWidth]);

    useLayoutEffect(() => {
      if (!open) return;
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [open, updatePosition]);

    useEffect(() => {
      if (!open) return;
      const onPointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        if (
          panelRef.current?.contains(target) ||
          anchorRef.current?.contains(target)
        )
          return;
        onOpenChange(false);
      };
      document.addEventListener("pointerdown", onPointerDown);
      return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open, onOpenChange, anchorRef]);

    if (!open) return null;

    return createPortal(
      <Panel ref={setRefs} style={{ ...position, ...style }} {...rest}>
        {children}
      </Panel>,
      document.body,
    );
  },
);

Popover.displayName = "Popover";
