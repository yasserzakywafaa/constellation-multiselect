# constellation-multiselect

Technical test for a Senior Design System Developer: a custom **Multi-Select** built with
React 18, Styled Components 6, TypeScript 5, Storybook 8, Vitest + React Testing Library, Yarn.

## 1. Plan

### Ideas

- Treat the Multi-Select as a **composition of reusable primitives**, not a monolith. Any future
  input (Select, Combobox, DatePicker, TagInput) should be able to reuse the same pieces.
- Use the native `<select multiple>` as the behavioural reference (value model, `name`, disabled,
  form participation), but render a custom, accessible UI following the WAI-ARIA
  [Listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).
- Keep focus on a single trigger element and drive the list with `aria-activedescendant`
  (no roving focus), so screen readers announce the active option while focus stays put.
- Separate **behaviour (hooks)** from **presentation (primitives)** from **assembly (components)**.
- All visual values come from **theme tokens** (colour, spacing, radius, typography, shadow, z-index).

### Architecture

```
src/
  theme/        tokens.ts, theme.ts, styled.d.ts (typed DefaultTheme), GlobalStyle
  primitives/   Field · InputBox · Popover · Listbox + Option · Tag
  hooks/        useControllableState · useDisclosure · useListNavigation
  components/   MultiSelect (assembles the above)
```

| Layer                  | Responsibility                                                          | Reused by                      |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------ |
| `Field`                | label / helper / error + id wiring (`aria-describedby`, `aria-invalid`) | every input                    |
| `InputBox`             | trigger box, focus/disabled/error visuals                               | Select, Combobox, DatePicker   |
| `Popover`              | open/close, outside click, Escape, focus return                         | Select, Menu, DatePicker       |
| `Listbox`/`Option`     | ARIA listbox semantics, selected/active visuals                         | Select, Combobox, Autocomplete |
| `Tag`                  | removable chip                                                          | TagInput, Filters              |
| `useControllableState` | controlled/uncontrolled value                                           | every stateful input           |
| `useDisclosure`        | open state                                                              | Popover, Accordion, Dialog     |
| `useListNavigation`    | arrows, Home/End, Enter/Space, Escape                                   | Listbox, Menu, Tabs            |

### Task list

1. [x] README plan (this)
2. [x] Tooling: Yarn, TS, Storybook 8, Vitest + RTL, ESLint
3. [x] Theme tokens + typed theme
4. [x] Primitives with stories
5. [ ] Hooks

### Out of scope (next steps)

Search / combobox filtering, option groups, async options, virtualisation, select-all, max selections.
