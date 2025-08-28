"use client";
import AgeCountChart from "../../../ui/charts/age-count-chart";
import GenderCountChart from "../../../ui/charts/gender-count-chart";
import SponsorCountChart from "../../../ui/charts/top-ten-sponsors-chart";
import TopTenConditionsChart from "../../../ui/charts/top-ten-conditions-chart";
import TrialCountChart from "../../../ui/charts/trial-count-chart";
import CompleteTrialsCountChart from "../../../ui/charts/complete-trials-count-chart";
import OngoingTrialsCountChart from "../../../ui/charts/ongoing-trials-count-chart";
import EndedTrialsCountChart from "../../../ui/charts/ended-trials-count-chart";
import USYearCountChart from "../../../ui/charts/us-year-count-chart";
import EUYearCountChart from "../../../ui/charts/eu-year-count-chart";

// Charts page - displays all chart types
const Charts = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      <div><TrialCountChart /></div>
      <div><SponsorCountChart /></div>
      <div><AgeCountChart /></div>
      <div><GenderCountChart /></div>
      <div><TopTenConditionsChart /></div>
      <div><CompleteTrialsCountChart /></div>
      <div><OngoingTrialsCountChart /></div>
      <div><EndedTrialsCountChart /></div>
      <div><USYearCountChart /></div>
      <div><EUYearCountChart /></div>
    </div>
  );
};

export default Charts;
