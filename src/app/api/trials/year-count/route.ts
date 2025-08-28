import { NextRequest, NextResponse } from "next/server";
import { getTrialsData } from "../../../../../lib/dataCache";
import { ClinicalTrialData } from "../../../../../util/parserUtil";

// API to aggregate trial count by start year
export async function GET(req: NextRequest) {
  const region = req.nextUrl.searchParams.get("region");
  const data: ClinicalTrialData[] = await getTrialsData();

  const aggregated = data.reduce((acc: Record<string, number>, item: ClinicalTrialData) => {
    if (item.region !== region) {
      return acc;
    } else if (!isNaN(item.startDate.getTime())) {
      const year = item.startDate.getFullYear().toString();
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {});
  
  return NextResponse.json(aggregated);
}