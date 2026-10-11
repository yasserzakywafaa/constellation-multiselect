import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "../src/theme";

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div style={{ maxWidth: 360 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
