import { Box, Grid, MenuItem, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from '../../context/socket';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectId } from "../../app/reducers/CurrentUserSlice";
// import { selectNotifications, setNotifications } from "../../app/reducers/NotificationSlice";
import axios from "axios";
import config from "../../config/config";
import { NotificationType } from "../../utils/CommonTypes"
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";

interface NotificationProps {
    notification: NotificationType;
    maxWidth: string;
}

const Notification: React.FC<NotificationProps> = ({notification, maxWidth}) => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [socketNotifications, setSocketNotifications] = useState([]);
  const userid = useAppSelector(selectId);

  let icon = null;
  let url = null;
  let notimessage = notification.NotiMessage;

  switch(notification.Icon) {
    case "Approved": icon=<CheckCircleIcon sx={{fontSize: "30px", color: "#31A961"}}/>;
    break;
    case "Rejected": icon=<CancelIcon sx={{fontSize: "30px", color: "#D11A2A"}}/>;
    break;
    case "Information": icon=<InfoIcon sx={{fontSize: "30px", color: "#3F4D65"}}/>;
    break;
  }

  if (notification.ContentID) {
    notimessage = notification.NotiMessage.replace("{a}", notification.ContentID.toString())
    url = notification.Url.replace("${a}", notification.ContentID.toString())
  } else {
    url = "/notifications";
  }


  return (
  <Box onClick={() => navigate(url)}>
                  <Grid container spacing={2}>
                <Grid
                  item
                  className="flexcontainer"
                  sx={{ mr: "10px", ml: "10px" }}
                >
                  {icon}
                  {/* <img alt="complex" src="/static/images/grid/complex.jpg" /> */}
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        sx={{ color: "#0A2540", fontWeight: 600, overflow: "hidden", width: maxWidth,textOverflow: "ellipsis"  }}
                        component="div"
                      >
                        {notification.NotiFeature}
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ color: "#0A2540", overflow: "hidden", width: maxWidth,textOverflow: "ellipsis"}}
                      >
                        {notimessage}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className="flexcontainer"
                    sx={{ flexDirection: "column" }}
                  >
                  </Grid>
                </Grid>
              </Grid>
  </Box>
  )
}

export default Notification;