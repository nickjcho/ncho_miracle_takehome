"use client";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "../chart-card";
import { DataUnit } from "../../util/types";
import { Box, CircularProgress } from "@mui/material";


const PieChartCard = ({ data, title }: { data: DataUnit[], title: string }) => {
  const COLORS = [
  "#064273",
  "#0B5995",
  "#116EB8",
  "#1785DB",
  "#1E9BE0",
  "#3B9AD4",
  "#5B9AD9",
  "#7BA9DD",
  "#9BB8E1",
  "#BAD4EA"
];

  return (
    <ChartCard title={title}>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="key"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data && data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right"/>
          </PieChart>
        </ResponsiveContainer>
      ): (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </ChartCard>
  );
};

export default PieChartCard;
