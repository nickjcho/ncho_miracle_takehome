// Util types and functions used for EU/US specific data normalization and parsing

export type ClinicalTrialData = {
  title: string,
  region: TrialRegion,
  startDate: Date,
  sponsorName: string,
  populationGender: GenderGroup,
  populationAgeGroups: AgeGroup[],
  medicalConditions: string[],
  completionStatus: RegionalCompletionStatus[]
}

export enum GenderGroup {
  MALE = "Male",
  FEMALE = "Female",
  BOTH = "Both"
}

export enum AgeGroup {
  UNDER_EIGHTEEN = "Under 18",
  ADULT = "Adult",
  OLDER_ADULT = "Older Adult"
}

export enum CompletionStatus {
  COMPLETED = "Completed",
  ONGOING = "Ongoing",
  PREMATURELY_ENDED = "Prematurely Ended",
  OTHER_OR_UNKNWON = "Other/Unknown"
}

export enum TrialRegion {
  EU = "EU",
  US = "US"
}

export type RegionalCompletionStatus = {
  localRegion: string,
  completionStatus: CompletionStatus
}

// @ts-expect-error No practical type for input JSON data
export const parseEUTrialData = (dataJson): ClinicalTrialData[] => {
  const parsedTrialData: ClinicalTrialData[] = [];
  // @ts-expect-error No practical type for input JSON data
  dataJson.forEach((row) => {
    try {
      const parsedRow: ClinicalTrialData = {
        title: row["Full Title"],
        region: TrialRegion.EU,
        startDate: new Date(row["Start Date"]),
        sponsorName: row["Sponsor Name"],
        populationGender: parseEUGender(row["Gender"]),
        populationAgeGroups: parseEUAgeGroup(row["Population Age"]),
        medicalConditions: row["Medical condition"],
        completionStatus: parseEUCompletionStatusByRegion(row["Trial protocol"])
      };
      parsedTrialData.push(parsedRow);
    } catch (err) {
      console.log(`skipping EU row due to error ${err}`);
    }
  });

  return parsedTrialData;
};

// @ts-expect-error No practical type for input JSON data
export const parseUSTrialData = (dataJson): ClinicalTrialData[] => {
  const parsedTrialData: ClinicalTrialData[] = [];
  // @ts-expect-error No practical type for input JSON data
  dataJson.forEach((row) => {
    try {
      row = row.protocolSection;
      const parsedRow: ClinicalTrialData = {
        title: row.identificationModule?.briefTitle,
        region: TrialRegion.US,
        startDate: new Date(row.statusModule?.startDateStruct?.date),
        sponsorName: row.sponsorCollaboratorsModule?.leadSponsor?.name,
        populationGender: parseUSGender(row.eligibilityModule?.sex),
        populationAgeGroups: parseUSAgeGroup(row.eligibilityModule?.stdAges),
        medicalConditions: row.conditionsModule?.conditions ?? [],
        completionStatus: parseUSCompletionStatus(row.statusModule?.overallStatus)
      };
      parsedTrialData.push(parsedRow);
    } catch (err) {
      console.log(`skipping USrow due to error ${err}`);
    }
  });

  return parsedTrialData;
};

const parseEUGender = (genders: string[]): GenderGroup => {
  if (!genders) {
    throw Error("Skip null gender values");
  } 
  if (genders.includes("Male") && genders.includes("Female")) {
    return GenderGroup.BOTH;
  } else if (genders.includes("Female")) {
    return GenderGroup.FEMALE;
  } else if (genders.includes("Male")) {
    return GenderGroup.MALE;
  } else {
    throw Error(`Gender value ${genders} is not parseable`);
  }
};

const parseEUAgeGroup = (ageGroups: string[]): AgeGroup[] => {
  if (!ageGroups) {
    throw Error("Skip null age group values");
  } 

  const underEighteenTerms = ["Adolescents", "Under 18", "In utero", "Infants and toddlers", "Preterm newborn infants", "Children", "Newborns"];
  const parsedAgeGroups: AgeGroup[] = [];
  if (underEighteenTerms.some((val) => ageGroups.includes(val))) {
    parsedAgeGroups.push(AgeGroup.UNDER_EIGHTEEN);
  }
  if (ageGroups.includes("Adults")) {
    parsedAgeGroups.push(AgeGroup.ADULT);
  }
  if (ageGroups.includes("Elderly")) {
    parsedAgeGroups.push(AgeGroup.OLDER_ADULT);
  }
  return parsedAgeGroups;
};

const parseEUCompletionStatusByRegion = (trialProtocols: Record<string, string>[]): RegionalCompletionStatus[] => {
    if (!trialProtocols) {
      throw Error("Skip null status values");
    }   
    const parsedCompletionStatuses: RegionalCompletionStatus[] = trialProtocols.map((protocol) => {
    const localRegion = Object.keys(protocol)[0];
    const status = Object.values(protocol)[0];
    let parsedCompletionStatus;

    if (status === "Completed") {
      parsedCompletionStatus = CompletionStatus.COMPLETED;
    } else if (status === "Ongoing") {
      parsedCompletionStatus = CompletionStatus.ONGOING;
    } else if (status === "Prematurely Ended") {
      parsedCompletionStatus = CompletionStatus.PREMATURELY_ENDED;
    } else {
      parsedCompletionStatus = CompletionStatus.OTHER_OR_UNKNWON;
    }

    const parsedStatus: RegionalCompletionStatus = { localRegion, completionStatus: parsedCompletionStatus };
    return parsedStatus;
  });

  return parsedCompletionStatuses;
}

const parseUSGender = (gender: string): GenderGroup => {
  if (!gender) {
    throw Error("Skip null gender values");
  } 
  if (gender === "ALL") {
    return GenderGroup.BOTH;
  } else if (gender === "FEMALE") {
    return GenderGroup.FEMALE;
  } else if (gender === "MALE") {
    return GenderGroup.MALE;
  } else {
    throw Error(`Gender value ${gender} is not parseable`);
  }
};

const parseUSAgeGroup = (ageGroups: string[]): AgeGroup[] => {
  if (!ageGroups) {
    throw Error("Skip null age group values");
  } 

  const parsedAgeGroups: AgeGroup[] = [];
  if (ageGroups.includes("CHILD")) {
    parsedAgeGroups.push(AgeGroup.UNDER_EIGHTEEN);
  }
  if (ageGroups.includes("ADULT")) {
    parsedAgeGroups.push(AgeGroup.ADULT);
  }
  if (ageGroups.includes("OLDER_ADULT")) {
    parsedAgeGroups.push(AgeGroup.OLDER_ADULT);
  }
  return parsedAgeGroups;
};

const parseUSCompletionStatus = (status: string): RegionalCompletionStatus[] => {
  if (!status) {
    throw Error("Skip null status values");
  }   

  let parsedCompletionStatus;

  const ongoingStatuses = [
    "ACTIVE_NOT_RECRUITING",
    "ENROLLING_BY_INVITATION",
    "NOT_YET_RECRUITING",
    "RECRUITING",
    "AVAILABLE",
    "APPROVED_FOR_MARKETING"
  ];
  const prematurelyEndedStatuses = [
    "SUSPENDED",
    "TERMINATED",
    "WITHDRAWN",
    "NO_LONGER_AVAILABLE",
    "TEMPORARILY_NOT_AVAILABLE",
    "WITHHELD"
  ];

  if (status === "COMPLETED") {
    parsedCompletionStatus = CompletionStatus.COMPLETED;
  } else if (ongoingStatuses.includes(status)) {
    parsedCompletionStatus = CompletionStatus.ONGOING;
  } else if (prematurelyEndedStatuses.includes(status)) {
    parsedCompletionStatus = CompletionStatus.PREMATURELY_ENDED;
  } else {
    parsedCompletionStatus = CompletionStatus.OTHER_OR_UNKNWON;
  }

  const parsedStatus: RegionalCompletionStatus = { localRegion: "US", completionStatus: parsedCompletionStatus };
  return [parsedStatus];
}