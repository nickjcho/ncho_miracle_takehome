import { NextRequest, NextResponse } from "next/server";
import { getTrialsData } from "../../../../../lib/dataCache";
import { ClinicalTrialData } from "../../../../../util/parserUtil";

// API to aggregate by count based on input column type
// Meant for singular data field values (i.e. sponsor name)
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");
  const data: ClinicalTrialData[] = await getTrialsData();

  if (!type) {
    return NextResponse.json(
      { error: 'Missing required parameter: type' },
      { status: 400 }
    );
  }

  const aggregated = data.reduce((acc: Record<string, number>, item: ClinicalTrialData) => {
    const countType = item[type as keyof ClinicalTrialData];
    const key = countType != null ? String(countType) : 'unknown';
    if (key === 'unknown') {
      return acc;
    } else {
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }
  }, {});
  
  return NextResponse.json(aggregated);
}