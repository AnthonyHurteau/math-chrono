const background = {
  light: { paper: "#f5f5f5", default: "#eaeaea" },
  dark: { paper: "#1f272a", default: "#1f272a" },
};

const primary = {
  light: "#6ff9ff",
  main: "#26c6da",
  dark: "#0095a8",
  contrastText: "rgba(0, 0, 0, 1)",
};

const secondary = {
  light: "#428e92",
  main: "#006064",
  dark: "#00363a",
  contrastText: "#fff",
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
        chalkboard: {
          background: `url(${process.env.PUBLIC_URL}/chalkboard-green.png)`,
          size: "cover",
        },
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
        chalkboard: {
          background: `url(${process.env.PUBLIC_URL}/chalkboard-black.png)`,
          size: null,
        },
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
          mode,
          ...(mode === "dark"
            ? {
              a: {
                color: primary.main,
                textDecoration: "none",
              },
              "a:hover": {
                color: primary.light,
              },
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundColor: secondary.dark,
                minHeight: 24,
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
              a: {
                color: primary.main,
                textDecoration: "none",
              },
              "a:hover": {
                color: primary.light,
              },
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundColor: secondary.dark,
                minHeight: 24,
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
