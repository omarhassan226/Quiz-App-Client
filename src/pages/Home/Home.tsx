import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { styled } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5"
}));

const SplashScreen = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  transition: "opacity 0.5s ease",
  opacity: 1,
}));

const Home: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

  const handleLogin = async () => {
    setLoading(true);
    await login();
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {splashVisible && (
        <SplashScreen>
          <CircularProgress />
        </SplashScreen>
      )}
      <Container>
        <Button
          onClick={handleLogin}
          variant="contained"
          disabled={loading}
          sx={{
            width: '200px',
            height: '50px',
            backgroundColor: "#6cc3d5",
            fontSize: '24px',
            color: "#fff",
            textTransform: "none",
            position: "relative",
            "&:hover": { backgroundColor: "#5ab1c3" },
            transition: "transform 0.3s ease",
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Container>
    </>
  );
};

export default Home;
