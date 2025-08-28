import { NextRequest, NextResponse } from "next/server";
import { getTrialsData } from "../../../../../lib/dataCache";
import { ClinicalTrialData, CompletionStatus, RegionalCompletionStatus } from "../../../../../util/parserUtil";

// API to aggregate trial completion status by region (US and EU)
export async function GET(req: NextRequest) {
  const completionStatus = req.nextUrl.searchParams.get("completionStatus");
  const data: ClinicalTrialData[] = await getTrialsData();

  const aggregated = data.reduce((acc: Record<string, number>, item) => {
    if (!Array.isArray(item.completionStatus)) {
      return acc;
    } else {
      const parsedCompletionStatus: CompletionStatus = CompletionStatus[completionStatus as keyof typeof CompletionStatus];
      item.completionStatus.forEach((status: RegionalCompletionStatus) => {
      if (status.completionStatus === parsedCompletionStatus && status.localRegion) {
        acc[status.localRegion] = (acc[status.localRegion] || 0) + 1;
      }      
    });
    }
    return acc;
  }, {});
  
  return NextResponse.json(aggregated);
}