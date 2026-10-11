import styled from "styled-components";

export const TagList = styled.ul`
  display: contents;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Trigger = styled.span`
  flex: 1;
  outline: none;
  cursor: pointer;

  &[aria-disabled="true"] {
    cursor: not-allowed;
  }
`;

export const Placeholder = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Caret = styled.span<{ $open: boolean }>`
  margin-left: auto;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  transition: transform 120ms ease;
`;
