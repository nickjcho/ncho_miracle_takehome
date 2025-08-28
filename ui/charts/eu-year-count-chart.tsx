"use client";
import { useEffect, useState } from "react";
import { DataUnit } from "../../util/types";
import LineChartCard from "../chart-types/line-chart-card";

// Chart comparing new trials by year in the EU
const EUYearCountChart = () => {
  const [countData, setCountData] = useState<DataUnit[]>([]);

  useEffect(() => {
    const getTrials = async () => {
      const res = await fetch('/api/trials/year-count?region=EU');
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
      title="Number of clinical trials started per year (EU)"
      data={countData}
    />
  );
};

export default EUYearCountChart;
