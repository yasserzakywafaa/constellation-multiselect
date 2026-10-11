import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Tag } from "./Tag";

const meta = {
  title: "Primitives/Tag",
  component: Tag,
  args: { children: "Cherry" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Static: Story = {};

export const Removable: Story = {
  args: { onRemove: fn() },
};

export const Disabled: Story = {
  args: { onRemove: fn(), disabled: true },
};

export const LongLabel: Story = {
  args: {
    children: "An unusually long option label that should truncate",
    onRemove: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 160 }}>
        <Story />
      </div>
    ),
  ],
};
