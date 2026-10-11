import styled, { css } from "styled-components";

interface BoxProps {
  $invalid?: boolean;
  $disabled?: boolean;
}

export const Box = styled.div<BoxProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  min-height: ${({ theme }) => theme.sizes.control};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.size.md};
  transition:
    border-color 120ms ease,
    box-shadow 120ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  ${({ $invalid, theme }) =>
    $invalid &&
    css`
      border-color: ${theme.colors.danger};
      &:hover,
      &:focus-within {
        border-color: ${theme.colors.danger};
      }
    `}

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      background: ${theme.colors.surfaceDisabled};
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
      &:hover {
        border-color: ${theme.colors.border};
      }
    `}
`;
