import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";
import { Popover, type PopoverPlacement } from "./Popover";

const Trigger = styled.button`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  font: inherit;
  cursor: pointer;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.space[3]};
`;

/** Clipping container: proves the portal escapes overflow: hidden. */
const Clip = styled.div`
  overflow: hidden;
  padding: ${({ theme }) => theme.space[4]};
  border: 1px dashed ${({ theme }) => theme.colors.border};
`;

const PopoverDemo = ({ placement }: { placement: PopoverPlacement }) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Clip>
      <Trigger
        ref={anchorRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="demo-popover"
        onClick={() => setOpen((o) => !o)}
      >
        Toggle popover
      </Trigger>
      <Popover
        id="demo-popover"
        role="dialog"
        aria-label="Demo popover"
        open={open}
        onOpenChange={setOpen}
        anchorRef={anchorRef}
        placement={placement}
        matchAnchorWidth={false}
      >
        <Content>
          Rendered in a portal, so the dashed box can't clip it.
        </Content>
      </Popover>
    </Clip>
  );
};

const meta = {
  title: "Primitives/Popover",
  component: PopoverDemo,
  args: { placement: "bottom-start" },
  argTypes: {
    placement: {
      control: "select",
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
  },
} satisfies Meta<typeof PopoverDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TopEnd: Story = {
  args: { placement: "top-end" },
  parameters: { layout: "centered" },
};
