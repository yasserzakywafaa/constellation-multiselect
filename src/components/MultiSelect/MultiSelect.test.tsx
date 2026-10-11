import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { MultiSelect } from "./MultiSelect";
import type { MultiSelectProps } from "./MultiSelect.types";

const options = [
  { value: "react", label: "React" },
  { value: "nodejs", label: "Node.js" },
  { value: "dotnet", label: ".NET", disabled: true },
  { value: "typescript", label: "TypeScript" },
];

const renderMultiSelect = (props: Partial<MultiSelectProps> = {}) => {
  const onChange = vi.fn();
  render(
    <ThemeProvider theme={theme}>
      <MultiSelect
        label="Tech Stack"
        options={options}
        onChange={onChange}
        {...props}
      />
    </ThemeProvider>,
  );
  return {
    onChange,
    combobox: screen.getByRole("combobox", { name: "Tech Stack" }),
  };
};

const activeOption = (combobox: HTMLElement) => {
  const id = combobox.getAttribute("aria-activedescendant");
  return id ? document.getElementById(id) : null;
};

describe("MultiSelect", () => {
  it("selects and deselects options by clicking", async () => {
    const user = userEvent.setup();
    const { combobox, onChange } = renderMultiSelect();

    await user.click(combobox);
    expect(combobox).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("option", { name: "Node.js" }));
    expect(onChange).toHaveBeenLastCalledWith(["nodejs"]);
    expect(screen.getByRole("option", { name: "Node.js" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("button", { name: "Remove Node.js" }),
    ).toBeInTheDocument();

    // List stays open for picking more, and focus never leaves the combobox.
    expect(combobox).toHaveAttribute("aria-expanded", "true");
    expect(combobox).toHaveFocus();

    await user.click(screen.getByRole("option", { name: "Node.js" }));
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(
      screen.queryByRole("button", { name: "Remove Node.js" }),
    ).not.toBeInTheDocument();
  });

  it("ignores clicks on disabled options", async () => {
    const user = userEvent.setup();
    const { combobox, onChange } = renderMultiSelect();

    await user.click(combobox);
    await user.click(screen.getByRole("option", { name: "TypeScript" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("navigates with arrows, Home and End, and selects with Enter and Space", async () => {
    const user = userEvent.setup();
    const { combobox, onChange } = renderMultiSelect();

    combobox.focus();
    await user.keyboard("{ArrowDown}");
    expect(combobox).toHaveAttribute("aria-expanded", "true");
    expect(activeOption(combobox)).toHaveTextContent("React");

    await user.keyboard("{ArrowDown}");
    expect(activeOption(combobox)).toHaveTextContent("Node.js");

    // .NET is disabled, so the next stop is TypeScript.
    await user.keyboard("{ArrowDown}");
    expect(activeOption(combobox)).toHaveTextContent("TypeScript");

    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(["typescript"]);

    await user.keyboard("{Home}");
    expect(activeOption(combobox)).toHaveTextContent("React");

    await user.keyboard(" ");
    // Value follows option order, not click order.
    expect(onChange).toHaveBeenLastCalledWith(["react", "typescript"]);

    await user.keyboard("{End}");
    expect(activeOption(combobox)).toHaveTextContent("TypeScript");

    await user.keyboard("{ArrowUp}");
    expect(activeOption(combobox)).toHaveTextContent("Node.js");
  });

  it("closes on Escape and Tab", async () => {
    const user = userEvent.setup();
    const { combobox } = renderMultiSelect();

    combobox.focus();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Escape}");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
    expect(combobox).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Tab}");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
  });

  it("removes a value with its tag's remove button", async () => {
    const user = userEvent.setup();
    const { onChange } = renderMultiSelect({
      defaultValue: ["react", "typescript"],
    });

    await user.click(screen.getByRole("button", { name: "Remove React" }));
    expect(onChange).toHaveBeenLastCalledWith(["typescript"]);
    expect(
      screen.queryByRole("button", { name: "Remove React" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove TypeScript" }),
    ).toBeInTheDocument();
  });

  it("focuses the combobox when the label is clicked", async () => {
    const user = userEvent.setup();
    const { combobox } = renderMultiSelect();

    await user.click(screen.getByText("Tech Stack"));
    expect(combobox).toHaveFocus();
  });
});
