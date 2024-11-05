// Layout.tsx
import React, { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";

const Layout: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [show, setShow] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const showSidebar = useCallback(() => {
    setShow(prevShow => !prevShow);
  }, []);

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(
    () => {
      const handleWidthChange = () => {
        setShow(screenWidth >= 768);
      };

      handleWidthChange();

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    [screenWidth, handleResize]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar show={show} />
      <Box
        flex={1}
        sx={{
          marginLeft: show ? "196px" : "0",
          transition: "margin-left 0.3s ease-in-out"
        }}
      >
        <Navbar showSidebar={showSidebar} />
        <LanguageSwitcher />
        <Box sx={{ padding: '0px 16px 16px 16px' }}>
          {children}
          {/* <Outlet /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
