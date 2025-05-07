// ローカルストレージのキー
export const STORAGE_KEYS = {
  TEXT_COLORS: "contrast-checker-text-colors",
  BACKGROUND_COLORS: "contrast-checker-background-colors",
  COLOR_NAMES: "contrast-checker-color-names",
  THEME_MODE: "contrast-checker-theme-mode",
};

// WCAG基準値
export const WCAG_STANDARDS = {
  AA: 4.5,
  AAA: 7,
};

// デフォルト値
export const DEFAULT_VALUES = {
  TEXT_COLOR: "#000000",
  BACKGROUND_COLOR: "#FFFFFF",
  TEXT_COLOR_NAME: "文字色 1",
  BACKGROUND_COLOR_NAME: "背景色 1",
  THEME_MODE: "light",
};

// テーマ設定
export const getTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: mode === "light" ? "#f5f5f5" : "#121212",
      paper: mode === "light" ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "#ffffff",
      secondary:
        mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.7)",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            mode === "light"
              ? "0 2px 8px rgba(0,0,0,0.1)"
              : "0 2px 8px rgba(0,0,0,0.3)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
