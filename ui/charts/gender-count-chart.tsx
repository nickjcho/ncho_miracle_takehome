"use client";
import { useEffect, useState } from "react";
import BarChartCard from "../chart-types/bar-chart-card";
import { DataUnit } from "../../util/types";

// Chart comparing gender groups across all trials
const GenderCountChart = () => {
  const [countData, setCountData] = useState<DataUnit[]>([]);

  useEffect(() => {
    const getTrials = async () => {
      const res = await fetch('/api/trials/count?type=populationGender');
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
      title="Involvement of gender groups by number of trials"
      data={countData}
    />
  );
};

export default GenderCountChart;
