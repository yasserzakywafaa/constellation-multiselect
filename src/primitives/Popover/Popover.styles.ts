import styled from "styled-components";

export const Panel = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndices.popover};
  min-width: 160px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.popover};
  overflow: hidden;
`;
