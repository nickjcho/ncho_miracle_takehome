"use client";
import { useEffect, useState } from "react";
import { DataUnit } from "../../util/types";
import LineChartCard from "../chart-types/line-chart-card";

// Chart comparing new trials by year in the US
const USYearCountChart = () => {
  const [countData, setCountData] = useState<DataUnit[]>([]);

  useEffect(() => {
    const getTrials = async () => {
      const res = await fetch('/api/trials/year-count?region=US');
      const data = await res.json();
      const formattedData: DataUnit[] = Object.entries(data).map(([key, value]) => ({
        key,
        value: Number(value),
      }));
      setCountData(formattedData);
    };
    getTrials();
  },[]);


  return (
    <LineChartCard
      title="Number of clinical trials started per year (US)"
      data={countData}
    />
  );
};

export default USYearCountChart;
