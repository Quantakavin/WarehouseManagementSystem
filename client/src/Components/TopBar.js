import React from "react";
import "../Styles/Topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

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