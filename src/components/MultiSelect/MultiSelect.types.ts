import { Option } from "../../shared/types";

export interface MultiSelectProps {
  label: string;
  options: Option[];
  /** Controlled selection. Leave undefined for uncontrolled use. */
  value?: string[];
  /** Initial selection when uncontrolled. */
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  /** Submits one hidden input per selected value, like `<select multiple name>`. */
  name?: string;
}
