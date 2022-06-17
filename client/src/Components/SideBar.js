import "../Styles/SideBar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              {/* <LineStyle className="sidebarIcon" /> */}
              Dashboard
            </li>
            <li className="sidebarListItem">
              {/* <Timeline className="sidebarIcon" /> */}
              Products
            </li>
            <li className="sidebarListItem">
              {/* <TrendingUp className="sidebarIcon" /> */}
              T-Loans
            </li>
            <li className="sidebarListItem">
              {/* <TrendingUp className="sidebarIcon" /> */}
              RMA
            </li>
            <li className="sidebarListItem">
              {/* <TrendingUp className="sidebarIcon" /> */}
              User Managment
            </li>
            <li className="sidebarListItem">
              {/* <TrendingUp className="sidebarIcon" /> */}
              Bin Locations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
