import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    rowHover?: string;
    chalkboard?: {
      background?: string;
      size?: string;
    };
  }
  interface Palette {
    rowHover: string;
    chalkboard: {
      background: string;
      size: string;
    };
  }

  interface TypeText {
    hint: string;
  }
}
