import { palette, radii, shadows, space, typography, zIndices } from "./tokens";

/** Semantic theme: maps raw tokens to intent, so re-skinning means swapping this object. */
export const theme = {
  colors: {
    text: palette.grey900,
    textMuted: palette.grey600,
    textDisabled: palette.grey400,
    surface: palette.white,
    surfaceHover: palette.grey100,
    surfaceDisabled: palette.grey50,
    border: palette.grey200,
    borderHover: palette.grey400,
    primary: palette.blue500,
    primaryStrong: palette.blue600,
    primarySubtle: palette.blue50,
    danger: palette.red600,
    dangerSubtle: palette.red50,
  },
  space,
  radii,
  typography,
  shadows,
  zIndices,
  sizes: { control: "40px", listMaxHeight: "240px" },
} as const;

export type Theme = typeof theme;
