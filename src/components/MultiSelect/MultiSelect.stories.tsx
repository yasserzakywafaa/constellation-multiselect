import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import styled from "styled-components";
import { MultiSelect } from "./MultiSelect";
import options from "../../shared/options";

const meta = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  args: {
    label: "Tech Stack for Yasser",
    placeholder: "Choose tech stack…",
    helperText: "Pick as many as Yasser likes.",
    options: options,
    onChange: fn(),
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The parent owns the value; the component just reports changes. */
const ControlledDemo = () => {
  const [value, setValue] = useState<string[]>(["react"]);
  return (
    <>
      <MultiSelect
        label="Tech Stack for Yasser"
        options={options}
        value={value}
        onChange={setValue}
      />
      <p>Selected: {value.join(", ") || "none"}</p>
    </>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

const Clip = styled.div`
  overflow: hidden;
  padding: ${({ theme }) => theme.space[3]};
  border: 1px dashed ${({ theme }) => theme.colors.border};
`;

/** The list renders in a portal, so an overflow: hidden parent can't clip it. */
export const InsideOverflowHidden: Story = {
  render: (args) => (
    <Clip>
      <MultiSelect {...args} />
    </Clip>
  ),
};
