import type { Meta, StoryObj } from "@storybook/react";
import { Listbox, Option as ListBoxOption } from "./Listbox";
import options from "../../shared/options";

const meta = {
  title: "Primitives/Listbox",
  component: Listbox,
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiSelectable: Story = {
  args: { children: null },
  render: () => (
    <Listbox multiselectable aria-label="Tech Stack">
      {options.map((option) => (
        <ListBoxOption
          id={option.value}
          showCheck={option.disabled ? false : true}
          selected={option.value === "react" ? true : false}
          active={option.value === "nodejs" ? true : false}
          disabled={option.disabled ? true : false}
        >
          {option.label}
        </ListBoxOption>
      ))}
    </Listbox>
  ),
};

export const SingleSelect: Story = {
  args: { children: null },
  render: () => (
    <Listbox aria-label="Tech Stack">
      {options.map((option) => (
        <ListBoxOption
          id={option.value}
          selected={option.value === "react" ? true : false}
          active={option.value === "nodejs" ? true : false}
          disabled={option.disabled ? true : false}
        >
          {option.label}
        </ListBoxOption>
      ))}
    </Listbox>
  ),
};
