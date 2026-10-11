import { createContext, useContext, useId, type ReactNode } from "react";
import { HelperText, Label, RequiredMark, Wrapper } from "./Field.styles";

interface FieldContextValue {
  controlId: string;
  labelId: string;
  descriptionId?: string;
  invalid: boolean;
  required: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/** Inputs call this to get their ids and aria wiring from the surrounding Field. */
export const useFieldContext = () => {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error("useFieldContext must be used inside <Field>");
  return ctx;
};

export interface FieldProps {
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export const Field = ({
  label,
  helperText,
  error,
  required = false,
  children,
}: FieldProps) => {
  const baseId = useId();
  const controlId = `${baseId}-control`;
  const labelId = `${baseId}-label`;
  const message = error ?? helperText;
  const descriptionId = message ? `${baseId}-description` : undefined;

  // <label htmlFor> only focuses native inputs, so focus custom controls by id ourselves.
  const focusControl = () => document.getElementById(controlId)?.focus();

  return (
    <FieldContext.Provider
      value={{ controlId, labelId, descriptionId, invalid: !!error, required }}
    >
      <Wrapper>
        <Label id={labelId} htmlFor={controlId} onClick={focusControl}>
          {label}
          {required && <RequiredMark aria-hidden="true">*</RequiredMark>}
        </Label>
        {children}
        {message && (
          <HelperText id={descriptionId} $error={!!error}>
            {message}
          </HelperText>
        )}
      </Wrapper>
    </FieldContext.Provider>
  );
};
