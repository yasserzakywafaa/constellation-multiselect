import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  cursor: default;
`;

export const RequiredMark = styled.span`
  margin-left: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.danger};
`;

export const HelperText = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.textMuted};
`;
