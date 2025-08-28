"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

type FontSize = "normal" | "large";

const FontSizeContext = createContext<{
  fontSize: FontSize;
  toggleFontSize: () => void;
}>({
  fontSize: "normal",
  toggleFontSize: () => {},
});

export const useFontSize = () => useContext(FontSizeContext);

const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState<FontSize>("normal");

  const toggleFontSize = () => {
    setFontSize((prev) => (prev === "normal" ? "large" : "normal"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontSize: fontSize === "normal" ? 14 : 18,
        },
      }),
    [fontSize]
  );

  return (
    <FontSizeContext.Provider value={{ fontSize, toggleFontSize }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </FontSizeContext.Provider>
  );
};

export default FontSizeProvider;
