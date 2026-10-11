import styled from "styled-components";

export const TagRoot = styled.span<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  max-width: 100%;
  padding: 2px ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.surfaceHover : theme.colors.primarySubtle};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.textDisabled : theme.colors.text};
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight};
`;

export const TagLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surface};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
