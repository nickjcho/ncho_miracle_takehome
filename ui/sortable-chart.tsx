"use client";
import { Box, Card, CardContent, CardHeader, IconButton, SxProps } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseIcon from "@mui/icons-material/Close";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AgeCountChart from "./charts/age-count-chart";
import CompleteTrialsCountChart from "./charts/complete-trials-count-chart";
import EndedTrialsCountChart from "./charts/ended-trials-count-chart";
import EUYearCountChart from "./charts/eu-year-count-chart";
import GenderCountChart from "./charts/gender-count-chart";
import OngoingTrialsCountChart from "./charts/ongoing-trials-count-chart";
import TopTenConditionsChart from "./charts/top-ten-conditions-chart";
import TopTenSponsorsChart from "./charts/top-ten-sponsors-chart";
import TrialCountChart from "./charts/trial-count-chart";
import USYearCountChart from "./charts/us-year-count-chart";


// Renders appropriate chart based on input chart type
const ChartRenderer = ({ type }: { type: string }) => {
  switch (type) {
    case "ageCount":
      return <AgeCountChart />;
    case "completeTrialsCount":
      return <CompleteTrialsCountChart />;
    case "endedTrialsCount":
      return <EndedTrialsCountChart />;
    case "euYearCount":
      return <EUYearCountChart />;
    case "genderCount":
      return <GenderCountChart />;
    case "ongoingTrialsCount":
      return <OngoingTrialsCountChart />;
    case "topTenConditions":
      return <TopTenConditionsChart />;
    case "topTenSponsors":
      return <TopTenSponsorsChart />;
    case "trialCount":
      return <TrialCountChart />;
    case "usYearCount":
      return <USYearCountChart />;
    default:
      return <div>Unknown chart type</div>;
  }
};

// Wrapper component for chart with drag-n-drop logic
const SortableChart = ({
  id,
  type,
  onRemove,
}: {
  id: string;
  type: string;
  onRemove: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: SxProps = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
    userSelect: "none",
    marginBottom: 16,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Card ref={setNodeRef} sx={style} elevation={3}>
      <CardHeader
        action={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              {...attributes}
              {...listeners}
              size="small"
              sx={{ cursor: "grab" }}
            >
              <DragIndicatorIcon />
            </IconButton>
            <IconButton
              onClick={() => onRemove(id)}
              size="small"
              color="error"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        }
        sx={{ paddingBottom: 0, paddingTop: 1 }}
      />
      <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
        <ChartRenderer type={type} />
      </CardContent>
    </Card>
  );
};

export default SortableChart;