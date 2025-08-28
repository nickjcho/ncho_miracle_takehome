"use client";
import { Card, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";


// Wrapper component for charts
const ChartCard = ({ children, title }: { children: ReactNode, title: string }) => {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <Typography variant="h5" align="center" gutterBottom>
        {title}
      </Typography>
      <CardContent>
        { children }
      </CardContent>
    </Card>
  );
};

export default ChartCard;
