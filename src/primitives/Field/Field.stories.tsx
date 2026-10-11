import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";
import { Field, useFieldContext } from "./Field";

const DemoInput = styled.input`
  height: ${({ theme }) => theme.sizes.control};
  padding: 0 ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font: inherit;
`;

/** Stand-in control that wires itself up through the Field context, like any real input would. */
const ConnectedInput = () => {
  const { controlId, labelId, descriptionId, invalid, required } =
    useFieldContext();
  return (
    <DemoInput
      id={controlId}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      aria-invalid={invalid || undefined}
      aria-required={required || undefined}
    />
  );
};

const meta = {
  title: "Primitives/Field",
  component: Field,
  args: { label: "Tech Stack for Yasser", children: <ConnectedInput /> },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: "Pick as many as Yasser likes." },
};

export const Required: Story = {
  args: { required: true },
};

export const WithError: Story = {
  args: { required: true, error: "Please choose at least one tech stack." },
};
