"use client";
import { useEffect, useState } from "react";
import PieChartCard from "../chart-types/pie-chart-card";
import { DataUnit } from "../../util/types";

// Chart displaying top ten most common conditions across all trials
const TopTenConditionsChart = () => {
  const [countData, setCountData] = useState<DataUnit[]>([]);

  useEffect(() => {
    const getTrials = async () => {
      const res = await fetch('/api/trials/group-count?type=medicalConditions');
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
    <PieChartCard
      title="Top 10 conditions by trial count"
      data={countData}
    />
  );
};

export default TopTenConditionsChart;
