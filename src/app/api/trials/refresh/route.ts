import { NextResponse } from "next/server";
import { getTrialsData } from "../../../../../lib/dataCache";
import { resetCacheData } from "../../../../../lib/dataCache";


// API to refresh trial data. Data cache is reset, and then the data fetch and parsing is re-executed
export async function GET() {
  resetCacheData();
  await getTrialsData();
  return NextResponse.json({ message: "Trial data refreshed" });
}
