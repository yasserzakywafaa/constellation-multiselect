import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";
import { Field, useFieldContext } from "../Field";
import { InputBox } from "./InputBox";

const BareInput = styled.input`
  flex: 1;
  min-width: 60px;
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  color: inherit;
`;

const DemoChip = styled.span`
  padding: 2px ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primarySubtle};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

/** Input that takes its id and aria wiring from the surrounding Field. */
const ConnectedInput = ({ disabled }: { disabled?: boolean }) => {
  const { controlId, labelId, descriptionId, invalid } = useFieldContext();
  return (
    <BareInput
      id={controlId}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      placeholder="Type here…"
    />
  );
};

const meta = {
  title: "Primitives/InputBox",
  component: InputBox,
} satisfies Meta<typeof InputBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field label="Name">
      <InputBox {...args}>
        <ConnectedInput />
      </InputBox>
    </Field>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Field label="Name">
      <InputBox {...args}>
        <ConnectedInput disabled />
      </InputBox>
    </Field>
  ),
};

export const Invalid: Story = {
  args: { invalid: true },
  render: (args) => (
    <Field label="Name" error="This field is required.">
      <InputBox {...args}>
        <ConnectedInput />
      </InputBox>
    </Field>
  ),
};

export const WithContent: Story = {
  render: (args) => (
    <Field
      label="Favourite fruits"
      helperText="Any child can live inside the box."
    >
      <InputBox {...args}>
        <DemoChip>Apple</DemoChip>
        <DemoChip>Cherry</DemoChip>
        <ConnectedInput />
      </InputBox>
    </Field>
  ),
};
