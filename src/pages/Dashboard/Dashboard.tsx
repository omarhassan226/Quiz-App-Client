import React from "react";
import { Box, Grid2 } from "@mui/material";
import ExamTips from "../../components/ExamTips/ExamTips";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import DueAssignmentCard from "../../components/DueAssignmentCard/DueAssignmentCard";

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 sx={{ width: "100%" }} size={{ xs: 12, md: 12 }}>
          <ExamTips />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 9 }} sx={{ marginTop: "20px" }}>
          <AnnouncementCard />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }} sx={{ marginTop: "20px" }}>
          <DueAssignmentCard />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
