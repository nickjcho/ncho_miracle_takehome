"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import SortableChart from "../../../../ui/sortable-chart";

// All chart types and user-readable labels
const CHART_TYPES = [
  { type: "ageCount", label: "Age Count Chart" },
  { type: "completeTrialsCount", label: "Complete Trials Count Chart" },
  { type: "endedTrialsCount", label: "Ended Trials Count Chart" },
  { type: "euYearCount", label: "EU Year Count Chart" },
  { type: "genderCount", label: "Gender Count Chart" },
  { type: "ongoingTrialsCount", label: "Ongoing Trials Count Chart" },
  { type: "topTenConditions", label: "Top Ten Conditions Chart" },
  { type: "topTenSponsors", label: "Top Ten Sponsors Chart" },
  { type: "trialCount", label: "Trial Count Chart" },
  { type: "usYearCount", label: "US Year Count Chart" },
];

type Chart = {
  id: string;
  type: string;
};

// Dashboard client - handles all drag-n-drop logic, new chart generation, and local storage persistence
const DashboardClient = ({ dashboardId }: { dashboardId: number }) => {
  const localStorageKey = `dashboard-${dashboardId}-charts`;

  const [charts, setCharts] = useState<Chart[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState(CHART_TYPES[0].type);

  useEffect(() => {
    setHasLoaded(false);
    setCharts([]); // clear previous charts immediately on dashboard change

    // Get chart state for current dashboard ID from local storage
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      try {
        setCharts(JSON.parse(saved));
      } catch {
        setCharts([]);
      }
    }
    setHasLoaded(true);
  }, [localStorageKey]);

  useEffect(() => {
    // Persist chart state to local storage for input dashboard ID
    if (hasLoaded) {
      localStorage.setItem(localStorageKey, JSON.stringify(charts));
    }
  }, [charts, localStorageKey, hasLoaded]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = charts.findIndex((c) => c.id === active.id);
      const newIndex = charts.findIndex((c) => c.id === over.id);
      // Record chart order in chart state
      setCharts((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const addChart = () => {
    const newChart: Chart = {
      id: crypto.randomUUID(),
      type: selectedChartType,
    };
    setCharts((prev) => [...prev, newChart]);
  };

  const removeChart = (id: string) => {
    setCharts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Box
        sx={{ marginBottom: 3, display: "flex", alignItems: "center", gap: 2 }}
      >
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel id="chart-type-label">Chart Type</InputLabel>
          <Select
            labelId="chart-type-label"
            id="chart-type-select"
            value={selectedChartType}
            label="Chart Type"
            onChange={(e) => setSelectedChartType(e.target.value)}
          >
            {CHART_TYPES.map(({ type, label }) => (
              <MenuItem key={type} value={type}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={addChart} size="medium">
          + Add Chart
        </Button>
      </Box>

      <Box>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={charts.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2
              }}
            >
              {charts.map(({ id, type }) => (
                <SortableChart
                  key={id}
                  id={id}
                  type={type}
                  onRemove={removeChart}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
};

export default DashboardClient;
