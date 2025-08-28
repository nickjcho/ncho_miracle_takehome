"use client";
import { useEffect, useState } from "react";
import { DataUnit } from "../../util/types";
import BarChartCard from "../chart-types/bar-chart-card";

// Chart comparing prematurely ended trials across all regions (US and EU)
const EndedTrialsCountChart = () => {
  const [countData, setCountData] = useState<DataUnit[]>([]);

  useEffect(() => {
    const getTrials = async () => {
      const res = await fetch('/api/trials/region-status-count?completionStatus=PREMATURELY_ENDED');
      const data = await res.json();
      let formattedData: DataUnit[] = Object.entries(data).map(([key, value]) => ({
        key,
        value: Number(value),
      }));
      formattedData.sort((a, b) => b.value - a.value);
      formattedData = formattedData.slice(0,10);
      setCountData(formattedData);
    };
    getTrials();
  },[]);


  return (
    <BarChartCard
      title="Prematurely ended trials by region (Top 10)"
      data={countData}
    />
  );
};

export default EndedTrialsCountChart;
