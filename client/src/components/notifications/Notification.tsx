import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import VerifiedIcon from "@mui/icons-material/Verified";
import UpdateIcon from "@mui/icons-material/Update";
import TaskIcon from "@mui/icons-material/Task";
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { selectNotifications, setNotifications } from "../../app/reducers/NotificationSlice";
import { NotificationType } from "../../utils/CommonTypes";

interface NotificationProps {
  notification: NotificationType;
  maxWidth: string;
}

const Notification: React.FC<NotificationProps> = ({
  notification,
  maxWidth,
}) => {
  const navigate = useNavigate();
  // const [socketNotifications, setSocketNotifications] = useState([]);

  let icon = null;
  let url = null;
  let notimessage = notification.NotiMessage;

  switch (notification.Icon) {
    case "Approved":
      icon = <CheckCircleIcon sx={{ fontSize: "30px", color: "#31A961" }} />;
      break;
    case "Rejected":
      icon = <CancelIcon sx={{ fontSize: "30px", color: "#D11A2A" }} />;
      break;
    case "Received":
      icon = <CallReceivedIcon sx={{ fontSize: "30px", color: "#0a2540" }} />;
      break;
    case "Verified":
      icon = <VerifiedIcon sx={{ fontSize: "30px", color: "#0a2540" }} />;
      break;
    case "Progress":
      icon = <UpdateIcon sx={{ fontSize: "30px", color: "#0a2540" }} />;
      break;
    case "Closed":
      icon = <TaskIcon sx={{ fontSize: "30px", color: "#3F4D65" }} />;
      break;
      case "Ready":
        icon = <SignLanguageIcon sx={{ fontSize: "30px", color: "#31A961" }} />;
        break;
        case "Due":
          icon = <HourglassBottomIcon sx={{ fontSize: "30px", color: "#D11A2A" }} />;
          break;
      case "Information":
        icon = <InfoIcon sx={{ fontSize: "30px", color: "#3F4D65" }} />;
        break;
    default:
      icon = <CheckCircleIcon sx={{ fontSize: "30px", color: "#31A961" }} />;
      break;
  }

  if (notification.ContentID) {
    notimessage = notification.NotiMessage.replace(
      "{a}",
      notification.ContentID.toString()
    );
    url = notification.Url.replace("${a}", notification.ContentID.toString());
  } else {
    url = "/notifications";
  }

  return (
    <Box onClick={() => navigate(url)}>
      <Grid container spacing={2}>
        <Grid item className="flexcontainer" sx={{ mr: "10px", ml: "10px" }}>
          {icon}
          {/* <img alt="complex" src="/static/images/grid/complex.jpg" /> */}
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                sx={{
                  color: "#0A2540",
                  fontWeight: 600,
                  overflow: "hidden",
                  width: maxWidth,
                  textOverflow: "ellipsis",
                }}
                component="div"
              >
                {notification.NotiFeature}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  color: "#0A2540",
                  overflow: "hidden",
                  width: maxWidth,
                  textOverflow: "ellipsis",
                }}
              >
                {notimessage}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            className="flexcontainer"
            sx={{ flexDirection: "column" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Notification;
