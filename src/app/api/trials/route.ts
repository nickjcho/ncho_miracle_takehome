import { NextResponse } from "next/server";
import { getTrialsData } from "../../../../lib/dataCache";


// API to fetch trials data
export async function GET() {
  const data = await getTrialsData();
  return NextResponse.json(data);
}
