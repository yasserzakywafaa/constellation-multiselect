import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import {
  useControllableState,
  useDisclosure,
  useListNavigation,
} from "../../hooks";
import { Field, useFieldContext } from "../../primitives/Field";
import { InputBox } from "../../primitives/InputBox";
import { Listbox, Option } from "../../primitives/Listbox";
import { Popover } from "../../primitives/Popover";
import { Tag } from "../../primitives/Tag";
import { Caret, Placeholder, TagList, Trigger } from "./MultiSelect.styles";
import type { MultiSelectProps } from "./MultiSelect.types";

const EMPTY: string[] = [];

type ControlProps = Omit<
  MultiSelectProps,
  "label" | "helperText" | "error" | "required"
>;

/** The control itself. It reads ids and aria wiring from the surrounding Field. */
const MultiSelectControl = ({
  options,
  value,
  defaultValue = EMPTY,
  onChange,
  placeholder = "Select…",
  disabled = false,
  name,
}: ControlProps) => {
  const { controlId, labelId, descriptionId, invalid, required } =
    useFieldContext();
  const anchorRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const listboxId = `${controlId}-listbox`;
  const optionId = (index: number) => `${controlId}-option-${index}`;

  const [selected, setSelected] = useControllableState({
    value,
    defaultValue,
    onChange,
  });
  const { isOpen, open, close, setOpen } = useDisclosure();

  const isSelected = (optionValue: string) => selected.includes(optionValue);

  // Keep the value in option order, like a native <select multiple>, not click order.
  const toggleValue = useCallback(
    (optionValue: string) => {
      const next = selected.includes(optionValue)
        ? selected.filter((v) => v !== optionValue)
        : [...selected, optionValue];
      setSelected(options.map((o) => o.value).filter((v) => next.includes(v)));
    },
    [options, selected, setSelected],
  );

  const {
    activeIndex,
    setActiveIndex,
    onKeyDown: onListKeyDown,
  } = useListNavigation({
    items: options,
    onSelect: (index) => toggleValue(options[index].value),
  });

  // Focus stays on the trigger, so the browser won't scroll for us.
  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    const option = document.getElementById(optionId(activeIndex));
    if (typeof option?.scrollIntoView !== "function") return;
    option.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIndex]);

  const openList = () => {
    if (disabled) return;
    const firstSelected = options.findIndex(
      (o) => isSelected(o.value) && !o.disabled,
    );
    setActiveIndex(
      firstSelected !== -1
        ? firstSelected
        : options.findIndex((o) => !o.disabled),
    );
    open();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;
    if (!isOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }
    // Escape and Tab are the only ways the keyboard closes the list, and both go through the disclosure.
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "Tab") {
      close();
      return;
    }
    onListKeyDown(event);
  };

  // The box swallows mousedown so focus never leaves the combobox mid-click; we focus it ourselves.
  const onBoxClick = () => {
    if (disabled) return;
    triggerRef.current?.focus();
    if (isOpen) close();
    else openList();
  };

  const selectedOptions = options.filter((o) => isSelected(o.value));

  return (
    <>
      <InputBox
        ref={anchorRef}
        invalid={invalid}
        disabled={disabled}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onBoxClick}
      >
        {selectedOptions.length > 0 && (
          <TagList aria-label="Selected">
            {selectedOptions.map((o) => (
              <li key={o.value}>
                <Tag disabled={disabled} onRemove={() => toggleValue(o.value)}>
                  {o.label}
                </Tag>
              </li>
            ))}
          </TagList>
        )}
        <Trigger
          ref={triggerRef}
          id={controlId}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={
            isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
          }
          aria-disabled={disabled || undefined}
          aria-invalid={invalid || undefined}
          aria-required={required || undefined}
          onKeyDown={onKeyDown}
          onBlur={close}
        >
          {selectedOptions.length === 0 && (
            <Placeholder>{placeholder}</Placeholder>
          )}
        </Trigger>
        <Caret aria-hidden="true" $open={isOpen}>
          ▾
        </Caret>
      </InputBox>

      <Popover open={isOpen} onOpenChange={setOpen} anchorRef={anchorRef}>
        <Listbox id={listboxId} multiselectable aria-labelledby={labelId}>
          {options.map((o, index) => (
            <Option
              key={o.value}
              id={optionId(index)}
              showCheck
              selected={isSelected(o.value)}
              active={index === activeIndex}
              disabled={o.disabled}
              // Keep focus on the combobox so aria-activedescendant keeps working.
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => !o.disabled && setActiveIndex(index)}
              onClick={() => !o.disabled && toggleValue(o.value)}
            >
              {o.label}
            </Option>
          ))}
        </Listbox>
      </Popover>

      {name &&
        selected.map((v) => (
          <input key={v} type="hidden" name={name} value={v} />
        ))}
    </>
  );
};

/** Field + control, so consumers get label, helper text and error wiring in one component. */
export const MultiSelect = ({
  label,
  helperText,
  error,
  required,
  ...controlProps
}: MultiSelectProps) => (
  <Field
    label={label}
    helperText={helperText}
    error={error}
    required={required}
  >
    <MultiSelectControl {...controlProps} />
  </Field>
);
