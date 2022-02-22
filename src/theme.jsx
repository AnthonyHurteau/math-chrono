const background = {
  light: { paper: "#f5f5f5", default: "#f5f5f5" },
  dark: { paper: "#121212", default: "#121212" },
};

const secondary = {
  light: "#428e92",
  main: "#006064",
  dark: "#00363a",
  contrastText: "#fff",
};

const primary = {
  light: "#6ff9ff",
  main: "#26c6da",
  dark: "#0095a8",
  contrastText: "rgba(0, 0, 0, 1)",
};

const font = "\"Fredericka the Great\", \"Helvetica\", \"Arial\", cursive";

const getTheme = (mode) => ({
  typography: {
    fontFamily: font,
  },
  shape: {
    borderRadius: 5,
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
        // palette values for light mode
        common: { black: "#000", white: "#fff" },
        background: {
          paper: background.light.paper,
          default: background.light.default,
        },
        primary: {
          light: primary.light,
          main: primary.main,
          dark: primary.dark,
          contrastText: primary.contrastText,
        },
        secondary: {
          light: secondary.light,
          main: secondary.main,
          dark: secondary.dark,
          contrastText: secondary.contrastText,
        },
        text: {
          primary: "rgba(0, 0, 0, 0.87)",
          secondary: "rgba(0, 0, 0, 0.54)",
          disabled: "rgba(0, 0, 0, 0.38)",
          hint: "rgba(0, 0, 0, 0.38)",
        },
        rowHover: "#EBF5FB",
      }
      : {
        // palette values for dark mode
        common: { black: "#000", white: "#fff" },
        background: {
          paper: background.dark.paper,
          default: background.dark.default,
        },
        primary: {
          light: primary.light,
          main: primary.main,
          dark: primary.dark,
          contrastText: primary.contrastText,
        },
        secondary: {
          light: secondary.light,
          main: secondary.main,
          dark: secondary.dark,
          contrastText: secondary.contrastText,
        },
        text: {
          primary: "rgba(255, 255, 255, 1)",
          secondary: "rgba(207, 207, 207, 1)",
          disabled: "rgba(155, 155, 155, 1)",
          hint: "rgba(255, 255, 255, 1)",
        },
        rowHover: "#8bcef7",
      }),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: font,
          fontSize: "20px",
          a: {
            color: primary.main,
          },
          "a:hover": {
            color: primary.light,
          },
          mode,
          ...(mode === "dark"
            ? {
              scrollbarColor: `${secondary.dark} ${background.dark.default}`,
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                backgroundColor: background.dark.default,
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundColor: secondary.dark,
                minHeight: 24,
                border: `3px solid ${background.dark.default}`,
              },
              "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                  {
                    backgroundColor: secondary.main,
                  },
              "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                  {
                    backgroundColor: secondary.main,
                  },
              "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                  {
                    backgroundColor: secondary.main,
                  },
              "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                backgroundColor: background.dark.default,
              },
            }
            : {
              scrollbarColor: `#dadce0 ${background.light.default}`,
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                backgroundColor: background.light.default,
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundColor: "#dadce0",
                minHeight: 24,
                border: `3px solid ${background.light.default}`,
              },
              "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                  {
                    backgroundColor: secondary.main,
                  },
              "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                  {
                    backgroundColor: secondary.main,
                  },
              "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                  {
                    backgroundColor: secondary.main,
                  },
              "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                backgroundColor: background.light.default,
              },
            }),
        },
      },
    },
  },
});

export default getTheme;
