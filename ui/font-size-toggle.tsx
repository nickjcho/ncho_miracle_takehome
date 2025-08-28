"use client";
import { useState } from "react";
import { useFontSize } from "../theme/font-size-provider";
import { AppBar, Toolbar, Button, Stack } from "@mui/material";

// Font size toggle component
const FontSizeToggle = () => {
  const { fontSize, toggleFontSize } = useFontSize();
  const [loading, setLoading] = useState(false);

  const callRefresh = async () => {
    try {
      setLoading(true);
      await fetch('/api/trials/refresh');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Stack sx={{ marginLeft: "auto" }} direction="row" spacing={2}>
          <Button color="inherit" onClick={callRefresh} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh trials'}
          </Button>
          <Button color="inherit" onClick={toggleFontSize}>
            Font: {fontSize === 'normal' ? 'Normal' : 'Large'}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default FontSizeToggle;
