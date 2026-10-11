import styled, { css } from "styled-components";

export const ListboxRoot = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.space[1]};
  max-height: ${({ theme }) => theme.sizes.listMaxHeight};
  overflow-y: auto;
  font-size: ${({ theme }) => theme.typography.size.md};
`;

interface OptionStyleProps {
  $active: boolean;
  $selected: boolean;
  $disabled: boolean;
}

export const OptionRoot = styled.li<OptionStyleProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.colors.text};

  ${({ $selected, theme }) =>
    $selected &&
    css`
      font-weight: ${theme.typography.weight.medium};
    `}
  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.primarySubtle};
    `}
  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    `}
`;

export const OptionCheck = styled.span<{ $checked: boolean }>`
  flex: none;
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid
    ${({ theme, $checked }) =>
      $checked ? theme.colors.primary : theme.colors.borderHover};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.surface};
  position: relative;

  ${({ $checked, theme }) =>
    $checked &&
    css`
      &::after {
        content: "";
        position: absolute;
        left: 4px;
        top: 1px;
        width: 5px;
        height: 9px;
        border: solid ${theme.colors.surface};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    `}
`;
