import axios from "axios";
import { ClinicalTrialData, parseEUTrialData, parseUSTrialData } from "../util/parserUtil";
import data from "./eu_clinical_trials.json";

let cache: ClinicalTrialData[] = [];
let lastFetched = 0;
const TTL = 1000 * 60 * 10;

export const getTrialsData = async (): Promise<ClinicalTrialData[]> => {
  const now = Date.now();
  if (cache.length === 0|| now - lastFetched > TTL) {
    console.log('Fetching new data...');
    const response = await axios.get('https://clinicaltrials.gov/api/v2/studies', {
      params: {
        pageSize: 500,
      }
    });
    const parsedEUData: ClinicalTrialData[] = parseEUTrialData(data);
    const parsedUSData: ClinicalTrialData[] = parseUSTrialData(response.data.studies);
    cache = [...parsedEUData ,...parsedUSData];
    lastFetched = now;
  } else {
    console.log('Using cached data');
  }
  return cache;
}

export const resetCacheData = () => {
  cache = [];
}
