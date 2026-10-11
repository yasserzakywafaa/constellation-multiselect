import type { Meta, StoryObj } from "@storybook/react";
import { Listbox, Option } from "./Listbox";

const meta = {
  title: "Primitives/Listbox",
  component: Listbox,
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiSelectable: Story = {
  args: { children: null },
  render: () => (
    <Listbox multiselectable aria-label="Fruits">
      <Option id="fruit-apple" showCheck selected>
        Apple
      </Option>
      <Option id="fruit-banana" showCheck active>
        Banana (active)
      </Option>
      <Option id="fruit-cherry" showCheck>
        Cherry
      </Option>
      <Option id="fruit-durian" showCheck disabled>
        Durian (disabled)
      </Option>
    </Listbox>
  ),
};

export const SingleSelect: Story = {
  args: { children: null },
  render: () => (
    <Listbox aria-label="Fruit">
      <Option id="single-apple">Apple</Option>
      <Option id="single-banana" selected active>
        Banana
      </Option>
      <Option id="single-cherry">Cherry</Option>
    </Listbox>
  ),
};
