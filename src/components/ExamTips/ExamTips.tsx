import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from "@mui/material";
import { styles } from "./ExamTips.styles";
import { colors } from "../../utils/colors";
import { useTranslation } from "react-i18next";

const ExamTips = () => {
  const { t } = useTranslation();
  const [examImage, setExamImage] = useState<string | null>(null);

  useEffect(() => {
    import("../../assets/exam.png")
      .then((module) => {
        setExamImage(module.default);
      })
      .catch(() => {
        setExamImage(null);
      });
  }, []);

  return (
    <Container
      sx={{
        padding: { xs: 2, md: 3 },
        margin: "0",
        width: "100%",
        maxWidth: "100% !important",
        flexDirection: { xs: "column", md: "row" },
        ...styles.container
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 1, direction: "ltr", color: "#6cc3d5" }}
        >
          {t("title")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: colors.lightBlack }}>
          {t("intro")}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", color: "#7a7a7a", mb: 3 }}
        >
          {t("quote")}
        </Typography>
      </Box>
      {examImage && (
        <Box
          component="img"
          src={examImage}
          alt={t("examItems")}
          sx={{
            width: { xs: "100%", md: "100%" },
            maxWidth: "300px",
            mt: { xs: 3, md: 0 }
          }}
        />
      )}
    </Container>
  );
};

export default ExamTips;
