import * as React from "react";
import defaultprofile from "../../assets/defaultprofile.png";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectRole, selectName } from "../../app/reducers/CurrentUserSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import SidebarLink from "./SidebarLink";
import {
  selectCurrentTab,
  selectOpen,
  Open,
  Close,
} from "../../app/reducers/SidebarSlice";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isopen = useAppSelector(selectOpen);
  const username = useAppSelector(selectName);
  const userrole = useAppSelector(selectRole);
  const currenttab = useAppSelector(selectCurrentTab);
  const usertabs = ["Users", "User Groups", "Notification Groups"];

  const toggleopen = () => {
    if (isopen) {
      dispatch(Close());
    } else {
      dispatch(Open());
    }
  };

  return (
    <div className="sidebar">
      <div className="flexcontainer sidebarprofile">
        <div style={{ flex: 1 }}>
          <img
            alt="ISDN Logo"
            src={defaultprofile}
            width="40"
            height="40"
            className="d-inline-block align-top"
            style={{ marginRight: 15 }}
          />
        </div>
        {isopen && (
          <div style={{ flex: 3, marginTop: 8, marginBottom: -8 }}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {username}
            </p>
            <p style={{ fontSize: 12, fontWeight: 400, marginTop: -15 }}>
              {userrole}
            </p>
          </div>
        )}
        <div style={{ flex: 1 }}>
          <button
            className="buttonremovestyling"
            type="button"
            onClick={() => toggleopen()}
          >
            {isopen ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
          </button>
        </div>
      </div>
      <hr className="solid" style={{ height: 2, color: "#A4AAB6" }} />

      <p
        style={{
          color: "#BFC3CB",
          fontSize: 12,
          fontWeight: 400,
          marginTop: 30,
          marginBottom: 30,
          marginLeft: "8%",
        }}
      >
        MENU
      </p>
      <SidebarLink url="/dashboard" name="Dashboard" icon={<DashboardIcon />} />
      <SidebarLink url="/products" name="Products" icon={<InventoryIcon />} />
      <SidebarLink url="/Tloan" name="T-Loan" icon={<ArticleIcon />} />
      <SidebarLink url="/RMA" name="RMA" icon={<AssignmentReturnIcon />} />
      {/* <div className="sidebartabcontainer" style={{background: usertabs.includes(currenttab)? "#3F4D65": "transparent"}}>
      <button onClick={() => {}} className="buttonremovestyling" style={{flex: 1, marginLeft: "10%", marginTop: 8, marginBottom: 8, textAlign: "left"}}><PeopleAltIcon /> User Management</button>
      </div> */}
      <SidebarLink url="/users" name="Users" icon={<PersonIcon />} />
      <SidebarLink
        url="/usergroups"
        name="User Groups"
        icon={<PeopleAltIcon />}
      />
      <SidebarLink
        url="/notificationgroups"
        name="Notification Groups"
        icon={<NotificationAddIcon />}
      />
      <SidebarLink
        url="/binlocations"
        name="Bin Locations"
        icon={<WarehouseIcon />}
      />
    </div>
  );
};

export default Sidebar;

// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import {
//   LineStyle,
//   Timeline,
//   TrendingUp,
//   PermIdentity,
//   Storefront,
//   AttachMoney,
//   BarChart,
//   MailOutline,
//   DynamicFeed,
//   ChatBubbleOutline,
//   WorkOutline,
//   Report,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";

// interface SidebarLink {
//   url: string,
//   name: string
// }

// const SidebarLinks: SidebarLink[] = [
//   {
//     url: "/dashboard",
//     name: "Dashboard"
//   },
//   {
//     url: "/products",
//     name: "Products"
//   },
//   {
//     url: "/Tloans",
//     name: "T-Loans"
//   },
//   {
//     url: "/Rmas",
//     name: "RMA"
//   },
//   {
//     url: "/users",
//     name: "User Management"
//   },
//   {
//     url: "/binlocations",
//     name: "Bin Locations"
//   }
// ]

// const Sidebar = ()  => {
//   return (
//     <Drawer
//     sx={{
//       flexShrink: 1,
//       '& .MuiDrawer-paper': {
//         color: "white",
//         backgroundColor: "#0A2540",
//         width: "20%",
//         boxSizing: 'border-box',
//       },
//     }}
//     variant="permanent"
//     anchor="left"
//   >
//     <Toolbar />
//     <Divider />
//     <List>
//       {['Dashboard', 'Products', 'T-Loans', 'RMA'].map((text, index) => (
//         <ListItem key={text} disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>
//   </Drawer>

//     // <div className="sidebar">
//     //   <div className="sidebarWrapper">
//     //     <div className="sidebarMenu">
//     //       <h3 className="sidebarTitle">Menu</h3>
//     //       <ul className="sidebarList">
//     //         <Link to ="/dashboard" className="link">
//     //         <li className="sidebarListItem">
//     //           {/* <Timeline className="sidebarIcon" /> */}
//     //           Dashboard
//     //         </li>
//     //         </Link>

//     //         {/* </Link> */}
//     //         <Link to ="/products" className="link">
//     //         <li className="sidebarListItem">
//     //           {/* <Timeline className="sidebarIcon" /> */}
//     //           Products
//     //         </li>
//     //         </Link>

//     //         {/* <Link to ="/tloans" className="link"> */}
//     //         <li className="sidebarListItem">
//     //           {/* <TrendingUp className="sidebarIcon" /> */}
//     //           T-Loans
//     //         </li>
//     //         {/* </Link> */}

//     //         {/* <Link to ="/RMA" className="link"> */}
//     //         <li className="sidebarListItem">
//     //           {/* <TrendingUp className="sidebarIcon" /> */}
//     //           RMA
//     //         </li>
//     //         {/* </Link> */}

//     //         {/* <Link to ="/usermanagement" className="link"> */}
//     //         <li className="sidebarListItem">
//     //           {/* <TrendingUp className="sidebarIcon" /> */}
//     //           User Management
//     //         </li>
//     //         {/* </Link> */}

//     //         {/* <Link to ="/binlocations" className="link"> */}
//     //         <li className="sidebarListItem">
//     //           {/* <TrendingUp className="sidebarIcon" /> */}
//     //           Bin Locations
//     //         </li>
//     //         {/* </Link> */}
//     //       </ul>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }

// export default Sidebar;
