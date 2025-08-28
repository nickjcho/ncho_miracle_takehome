import { NextRequest, NextResponse } from "next/server";
import { getTrialsData } from "../../../../../lib/dataCache";
import { ClinicalTrialData } from "../../../../../util/parserUtil";

// API to aggregate by count based on input column type
// Meant for array data field values (i.e. medical conditions)
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");
  const data: ClinicalTrialData[] = await getTrialsData();

  if (!type) {
    return NextResponse.json(
      { error: 'Missing required parameter: type' },
      { status: 400 }
    );
  }

  const aggregated = data.reduce((acc: Record<string, number>, item) => {

    const countTypes = item[type as keyof ClinicalTrialData];
    if (!Array.isArray(countTypes)) {
      return acc;
    } else {
      countTypes.forEach(group => {
        if (group) {
          acc[group.toString()] = (acc[group.toString()] || 0) + 1;
        }
      });
    }
    return acc;
  }, {});
  
  return NextResponse.json(aggregated);
}