import React from "react";
import "../styles/Topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";

function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ISDN Holdings</span>
          </div>
        
      </div>
    </div>
  );
}

export default Topbar;