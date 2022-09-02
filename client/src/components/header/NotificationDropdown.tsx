import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { SocketContext } from "../../context/socket";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectId } from "../../app/reducers/CurrentUserSlice";
// import { selectNotifications, setNotifications } from "../../app/reducers/NotificationSlice";
import {
  selectNotificationCount,
  setNotificationCount,
} from "../../app/reducers/NotificationSlice";
import config from "../../config/config";
import { NotificationType } from "../../utils/CommonTypes";
import Notification from "../notifications/Notification";
import {
  GetNotifications,
  MarkNotificationsAsRead,
} from "../../api/NotificationDB";

interface NotificationDropdown {
  menuId: string;
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdown> = ({
  menuId,
  anchorEl,
  isMenuOpen,
  handleMenuClose,
}) => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const [socketNotifications, setSocketNotifications] = useState([]);
  const userid = useAppSelector(selectId);
  const notificationcount = useAppSelector(selectNotificationCount);
  // const inappnotifications = useAppSelector(selectNotifications)
  // const [notifications, setNotifications] = useState<NotificationType[]>([]);
  // const [notificationsLoaded, setNotificationsLoaded] = useState<boolean>(false)
  // const [notificationsLoading, setNotificationsLoading] = useState<boolean>(true);
  // const  [notificationsError, setNotificationsError] = useState<string>('')

  const NotificationsQuery = useQuery(
    [`notifications`, userid.toString()],
    () => GetNotifications(userid.toString()),
    {
      onSuccess: (data) => {
        dispatch(
          setNotificationCount({
            notificationCount: data.data.filter(
              (notification) => notification.Read === 0
            ).length,
          })
        );
      },
    }
  );

  const mutation = useMutation(
    () => MarkNotificationsAsRead(userid.toString()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`notifications`);
      },
    }
  );

  //   useEffect(() => {
  //     // if (!messagesLoaded) {
  //     //     getMessages();
  //     // }
  //     // setRoom();

  //     socket.on('notification', (addednotification)  => {
  //       console.log("received notification")
  //         const newNotification = {id: 1, content: addednotification.text}
  //         dispatch(setNotifications({inappnotifications: [...inappnotifications, newNotification]}));
  //         console.log(inappnotifications)
  //     });

  //     // return (() => {socket.off()})
  // }, [inappnotifications])

  //   useEffect(() => {
  //     if (!notificationsLoaded) {
  //         getNotifications();
  //     }
  //     // setRoom();
  //     // socket.on('message', (addedmessage)  => {
  //     //     let  belongstouser = (addedmessage.userid == localStorage.getItem("user_id"))
  //     //     const newMessage = {id: 1, case: belongstouser, content: addedmessage.text, date: addedmessage.date}
  //     //     setSocketMessages([...socketMessages, newMessage]);
  //     //     scrollToBottom()
  //     // });

  // }, [])

  // const getNotifications = () => {
  //   return axios.get(`${config.baseURL}/notifications/${userid}`, {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
  //     .then(response => {
  //       setNotifications(response.data);
  //       setNotificationsLoading(false);
  //       setNotificationsLoaded(true);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setNotificationsError(error)
  //       setNotificationsLoading(false);
  //       setNotificationsLoaded(true);
  //     })
  // }

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{ sx: { width: "340px" } }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      MenuListProps={{
        onMouseLeave: handleMenuClose,
      }}
      sx={{ zIndex: 2000, marginTop: "25px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "15px",
          paddingRight: "10px",
          alignItems: "center",
          mb: "5px",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>
          Notifications {notificationcount > 0 && `(${notificationcount})`}
        </Typography>
        {notificationcount > 0 && (
          <>
            {mutation.isLoading || mutation.isSuccess ? (
              <CircularProgress size="20px" sx={{ ml: "auto" }} />
            ) : (
              <Button
                onClick={() => mutation.mutate()}
                sx={{ textTransform: "none", ml: "auto", fontSize: "12px" }}
              >
                Mark all as read
              </Button>
            )}
          </>
        )}
      </Box>
      <Divider />
      {NotificationsQuery.status === "success" ? (
        <div>
          {NotificationsQuery.data.data.filter(
            (notification) => notification.Read === 0
          ).length !== 0 ? (
            <div>
              {NotificationsQuery.data.data
                .filter((notification) => notification.Read === 0)
                .slice(0, 5)
                .map((notification) => {
                  return (
                    <MenuItem key={notification.NotificationID}>
                      <Notification
                        maxWidth="220px"
                        notification={notification}
                      />
                    </MenuItem>
                  );
                })}
            </div>
          ) : (
            <div className="flexcontainer">
              <Typography sx={{ mt: "10px", mb: "10px", color: "#0a2540" }}>
                No unread notifications
              </Typography>
            </div>
          )}
          {NotificationsQuery.data.data.length > 0 && (
            <div>
              <Divider sx={{ width: "100%" }} />
              <div className="flexcontainer">
                <Button
                  onClick={() => navigate("/notifications")}
                  sx={{
                    textTransform: "none",
                    fontSize: "15px",
                    color: "#0a2540",
                    mb: "-5px",
                  }}
                >
                  View all notifications
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flexcontainer">
          <CircularProgress sx={{ mt: "10px", mb: "10px" }} />
        </div>
      )}
    </Menu>
  );
};

export default NotificationDropdown;
