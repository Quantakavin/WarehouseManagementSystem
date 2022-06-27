import "../styles/SideBar.scss";
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
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">
            <Link to ="/dashboard" className="link">
            <li className="sidebarListItem">
              {/* <Timeline className="sidebarIcon" /> */}
              Dashboard
            </li>
            </Link>

            {/* </Link> */}
            <Link to ="/products" className="link">
            <li className="sidebarListItem">
              {/* <Timeline className="sidebarIcon" /> */}
              Products
            </li>
            </Link>

            {/* <Link to ="/tloans" className="link"> */}
            <li className="sidebarListItem">
              {/* <TrendingUp className="sidebarIcon" /> */}
              T-Loans
            </li>
            {/* </Link> */}

            {/* <Link to ="/RMA" className="link"> */}
            <li className="sidebarListItem">
              {/* <TrendingUp className="sidebarIcon" /> */}
              RMA
            </li>
            {/* </Link> */}

            {/* <Link to ="/usermanagement" className="link"> */}
            <li className="sidebarListItem">
              {/* <TrendingUp className="sidebarIcon" /> */}
              User Management
            </li>
            {/* </Link> */}

            {/* <Link to ="/binlocations" className="link"> */}
            <li className="sidebarListItem">
              {/* <TrendingUp className="sidebarIcon" /> */}
              Bin Locations
            </li>
            {/* </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
