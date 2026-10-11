# constellation-multiselect 🚗

A small, slightly obsessive design-system challenge, written for my friends at
[Constellation Automotive](https://www.constellationautomotive.com/).

**Stack:** React 18 · Styled Components 6 · TypeScript 5 · Storybook 8 · Vitest +
React Testing Library · Yarn

---

> # [Open the live Storybook](https://constellation-multiselect.vercel.app/)
>
> https://constellation-multiselect.vercel.app/

---

## 1. Plan

### Ideas

- Treat the Multi-Select as a **composition of reusable primitives**. Any future
  input (Select, Combobox, DatePicker, TagInput) should be able to reuse the same pieces.
- Use the native `<select multiple>` as the behavioural reference (value model, `name`, disabled,
  form participation), and render a custom, accessible UI following the WAI-ARIA
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
| `Popover`              | open/close, outside click, focus return                                 | Select, Menu, DatePicker       |
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
5. [x] Hooks
6. [x] MultiSelect (~10 props, controlled + uncontrolled, tags, keyboard, ARIA)
7. [x] Stories: Default, Preselected, Disabled, Error, LongList, Controlled
8. [x] RTL tests: click select/deselect, keyboard, tag removal
9. [x] Document discoveries + outstanding tasks

### Out of scope (next steps)

Search / combobox filtering, option groups, async options, virtualisation, select-all, max selections.

## 2. Decisions & trade-offs ⚖️

- **WAI-ARIA combobox + listbox**: focus stays on the trigger and `aria-activedescendant` points to the active option.
- **Selection is a `string[]`**: it is simple to pass to `onChange` and works like native `<select multiple>`; values stay in option order.
- **Selected values show as `Tag`s inside the `InputBox`**; the remove button stops the click so the list stays put.
- **Controlled and uncontrolled** with `useControllableState` (`value` / `defaultValue` / `onChange`), like native inputs.
- **Escape is handled in one place**: only the component closes the list with `useDisclosure` (Escape, Tab, blur); `Popover` handles outside click and renders in a portal so `overflow: hidden` can't cut it.

## 3. Discoveries 🔍

- Option and box clicks must `preventDefault` on `mousedown`, or the trigger blurs and the list closes before the click lands.
- Extracting the hooks before the component made `MultiSelect` mostly wiring, and each behaviour is testable on its own.
- Typing `DefaultTheme` in `styled.d.ts` turns a wrong token name into a compile error.
- RTL's `userEvent` plus `aria-activedescendant` lookups test keyboard flows the way a screen reader experiences them.

## 4. Outstanding tasks ✨

- Stories: Preselected, Disabled, Error, LongList.
- Backspace on an empty trigger removes the last tag.
- Move the popover on scroll/resize and open it above when there is no space below.
- Tests for error text and the disabled state, plus barrel exports and a library build.

---

Have a look around the [live Storybook](https://constellation-multiselect.vercel.app/), the interesting bits are in the `primitives`. 👋

Made with love and coffee ☕ by [Yasser](https://www.yasserzaky.com), for my friends at [Constellation Automotive](https://www.constellationautomotive.com/).
