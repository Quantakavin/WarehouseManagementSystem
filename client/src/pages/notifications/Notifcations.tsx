import { Box, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import Shield from "@mui/icons-material/Shield";
import { useQuery } from "react-query";
import { GetNotifications } from "../../api/NotificationDB";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectId } from "../../app/reducers/CurrentUserSlice";
import { ChangeTab } from "../../app/reducers/SidebarSlice";
import Notification from "../../components/notifications/Notification";

const Notifications: React.FC = () => {
  const userID = useAppSelector(selectId);
  const [seeAll, setSeeAll] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChangeTab({currenttab: "null"}))
  }, []);


  const NotificationsQuery = useQuery(
    [`notifications`, userID.toString()],
    () => GetNotifications(userID.toString())
  );

  return (
    <Box sx={{ pl: 3, pr: 3, pt: 1, height: "100%", width: "100%" }}>
      <Box
        component="span"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          sx={{
            color: "#0A2540",
            fontWeight: "bold",
            fontSize: 36,
            mb: "20px",
          }}
        >
          Notifications
        </Typography>
        <Box>
          See All
          <Switch checked={seeAll} onChange={() => setSeeAll(!seeAll)} />
        </Box>
      </Box>
      {NotificationsQuery.status === "success" && (
        <div style={{ maxHeight: "600px", overflow: "auto" }}>
          {seeAll ? (
            <div>
              {NotificationsQuery.data.data.length !== 0 ? (
                <div>
                  {NotificationsQuery.data.data.map((notification) => {
                    return (
                      <Box
                        sx={{
                          backgroundColor: "white",
                          border: "solid 1px #d3d3d3",
                          borderRadius: "5px",
                          mb: "10px",
                          "&:hover": { backgroundColor: "#ededed" },
                        }}
                        key={notification.NotificationID}
                      >
                        <Notification
                          maxWidth="100%"
                          notification={notification}
                        />
                      </Box>
                    );
                  })}
                </div>
              ) : (
                <div className="flexcontainer">
                  <Typography sx={{ mt: "10px", mb: "10px", color: "#0a2540" }}>
                    No notifications
                  </Typography>
                </div>
              )}
            </div>
          ) : (
            <div>
              {NotificationsQuery.data.data.filter(
                (notification) => notification.Read === 0
              ).length !== 0 ? (
                <div>
                  {NotificationsQuery.data.data
                    .filter((notification) => notification.Read === 0)
                    .map((notification) => {
                      return (
                        <Box
                          sx={{
                            backgroundColor: "white",
                            border: "solid 1px #d3d3d3",
                            borderRadius: "5px",
                            mb: "10px",
                            "&:hover": { backgroundColor: "#ededed" },
                          }}
                          key={notification.NotificationID}
                        >
                          <Notification
                            maxWidth="100%"
                            notification={notification}
                          />
                        </Box>
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
            </div>
          )}
        </div>
      )}
    </Box>
  );
};
export default Notifications;
