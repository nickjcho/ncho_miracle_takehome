"use client";
import { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

// Sidebar component
const Sidebar = () => {
  const [dashboards, setDashboards] = useState<number[] | null>(null);
  const router = useRouter();

  // Load from localStorage on mount (client only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dashboards");
      if (stored) {
        setDashboards(JSON.parse(stored));
      } else {
        setDashboards([]); // fallback if nothing stored yet
      }
    }
  }, []);

  // Save to localStorage whenever dashboards change (only if not null)
  useEffect(() => {
    if (dashboards !== null) {
      localStorage.setItem("dashboards", JSON.stringify(dashboards));
    }
  }, [dashboards]);

  const handleCreateDashboard = () => {
    if (!dashboards) return;

    const nextId = dashboards.length > 0 ? Math.max(...dashboards) + 1 : 1;
    const updated = [...dashboards, nextId];
    setDashboards(updated);
    router.push(`/dashboard/${nextId}`);
  };

  if (dashboards === null) {
    // Optional loading state while reading from localStorage
    return (
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem key="home" disablePadding>
          <ListItemButton component={Link} href={"/"}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem key="charts" disablePadding>
          <ListItemButton component={Link} href={"/charts"}>
            <ListItemText primary="Chart Types" />
          </ListItemButton>
        </ListItem>
        {dashboards.map((id) => (
          <ListItem key={id} disablePadding>
            <ListItemButton component={Link} href={`/dashboard/${id}`}>
              <ListItemText primary={`Dashboard ${id}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ padding: 2, marginTop: "auto" }}>
        <Button variant="contained" fullWidth onClick={handleCreateDashboard}>
          + New Dashboard
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
