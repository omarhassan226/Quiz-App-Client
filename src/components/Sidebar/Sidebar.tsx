import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { FaHome } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { GrDocumentPerformance } from "react-icons/gr";
import { TfiAnnouncement } from "react-icons/tfi";
import { colors } from "../../utils/colors";
import { styles } from "./Sidebar.styles";

interface ISidebar {
  show: boolean;
}

const Sidebar: React.FC<ISidebar> = ({ show }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Dashboard");

  const handleListItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiPaper-root": {
          background: "linear-gradient(to bottom, #005F8D, #8fb5c7) !important",
          transition: "transform 0.3s ease-in-out",
          transform: show ? "translateX(0)" : "translateX(-100%)"
        }
      }}
      open={show}
    >
      <h1 style={styles.h1}>Coligo</h1>
      <List>
        {[
          { text: "Dashboard", icon: <FaHome /> },
          { text: "Schedule", icon: <AiOutlineSchedule /> },
          { text: "Courses", icon: <FaBook /> },
          { text: "Gradebook", icon: <FaGraduationCap /> },
          { text: "Performance", icon: <GrDocumentPerformance /> },
          { text: "Announcement", icon: <TfiAnnouncement /> }
        ].map(({ text, icon }) =>
          <ListItemButton
            key={text}
            onClick={() => handleListItemClick(text)}
            sx={{
              backgroundColor: selectedItem === text ? "white" : "transparent",
              color: selectedItem === text ? colors.accent : "white",
              "&:hover": {
                backgroundColor:
                  selectedItem === text ? "white" : "rgba(255, 255, 255, 0.1)"
              }
            }}
          >
            <ListItemIcon
              style={{
                color: selectedItem === text ? colors.accent : "inherit"
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
