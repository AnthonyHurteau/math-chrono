const background = {
  light: { paper: "#f5f5f5", default: "#f5f5f5" },
  dark: { paper: "#121212", default: "#121212" },
};

const primary = {
  light: "rgba(79, 91, 98, 1)",
  main: "rgba(38, 50, 56, 1)",
  dark: "rgba(0, 10, 18, 1)",
  contrastText: "#fff",
};

const secondary = {
  light: "rgba(103, 218, 255, 1)",
  main: "rgba(3, 169, 244, 1)",
  dark: "rgba(0, 122, 193, 1)",
  contrastText: "rgba(0, 0, 0, 1)",
};

const getTheme = (mode) => ({
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
        error: {
          light: "#e57373",
          main: "#f44336",
          dark: "#d32f2f",
          contrastText: "#fff",
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
        error: {
          light: "#e57373",
          main: "#f44336",
          dark: "#d32f2f",
          contrastText: "#fff",
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          mode,
          ...(mode === "dark"
            ? {
              scrollbarColor: `${primary.main} ${background.dark.default}`,
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                backgroundColor: background.dark.default,
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundColor: primary.main,
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
              a: {
                color: secondary.main,
              },
              "a:hover": {
                color: secondary.light,
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
              a: {
                color: secondary.main,
              },
              "a:hover": {
                color: secondary.light,
              },
            }),
        },
      },
    },
  },
});

export default getTheme;
