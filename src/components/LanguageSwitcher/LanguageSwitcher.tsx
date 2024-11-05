import { useTranslation } from "react-i18next";
import { Button, Box } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 2,
        marginTop: 2
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => changeLanguage("en")}
        sx={{
          marginRight: 2,
          textTransform: "none",
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#115293"
          }
        }}
      >
        English
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => changeLanguage("ar")}
        sx={{
          textTransform: "none",
          backgroundColor: "#f50057",
          "&:hover": {
            backgroundColor: "#ab003c"
          }
        }}
      >
        العربية
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
