/** Raw design tokens. Components read them through `theme`, never directly. */
export const palette = {
  white: "#ffffff",
  grey50: "#f7f8fa",
  grey100: "#eef0f4",
  grey200: "#dde1e8",
  grey400: "#9aa3b2",
  grey600: "#5b6576",
  grey900: "#1a1f29",
  blue50: "#ebf2ff",
  blue500: "#2563eb",
  blue600: "#1d4ed8",
  red50: "#fef2f2",
  red600: "#dc2626",
} as const;

export const space = {
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
} as const;

export const radii = { sm: "4px", md: "6px", pill: "999px" } as const;

export const typography = {
  fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  size: { sm: "12px", md: "14px", lg: "16px" },
  weight: { regular: 400, medium: 500, semibold: 600 },
  lineHeight: 1.4,
} as const;

export const shadows = {
  popover: "0 8px 24px rgba(26, 31, 41, 0.12)",
  focus: "0 0 0 3px rgba(37, 99, 235, 0.35)",
} as const;

export const zIndices = { base: 0, popover: 1000 } as const;
