import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

type ChartOptions = {
  aggregationType?: string;
  chartType?: string;
  dataPoint?: string;
  title?: string;
}

const CustomChart = () => {
  const [selectedChartOptions, setSelectedChartOptions] = useState<ChartOptions>({});
  return (
    <div>
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel id="aggregation-label">Aggregation Type</InputLabel>
          <Select
            labelId="aggregation-label"
            id="aggregation-select"
            value={selectedChartOptions.aggregationType || ""}
            label="Aggregation Type"
            onChange={(e) => setSelectedChartOptions({...selectedChartOptions, aggregationType: e.target.value})}
          >
            <MenuItem key={"count"} value={"count"}>
              Count
            </MenuItem>
          </Select>
        </FormControl>
    </div>
  );
};