"use client";
import { useEffect, useState } from "react";
import BarChartCard from "../chart-types/bar-chart-card";
import { DataUnit } from "../../util/types";

// Chart displaying trial count between US and EU
const TrialCountChart = () => {
  const [countData, setCountData] = useState<DataUnit[]>([]);

  useEffect(() => {
    const getTrials = async () => {
      const res = await fetch('/api/trials/count?type=region');
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
    <BarChartCard 
      title="Total number of clinical trials by region"
      data={countData}
    />
  );
};

export default TrialCountChart;
