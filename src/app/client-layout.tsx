"use client";
import { CssBaseline, Box } from "@mui/material";
import FontSizeProvider from "../../theme/font-size-provider";
import FontSizeToggle from "../../ui/font-size-toggle";
import Sidebar from "../../ui/sidebar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <CssBaseline />
    <FontSizeProvider>
      <FontSizeToggle />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            overflow: "auto",
            height: "100vh",
          }}
        >
          {children}
        </Box>
      </Box>
    </FontSizeProvider>
  </>
);

export default ClientLayout;