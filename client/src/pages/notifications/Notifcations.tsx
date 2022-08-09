import {
    Backdrop,
    Box,
    Fade,
    Grid,
    Modal,
    Paper,
    Switch,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Update2FA } from "../../api/UserDB";
  // import Shield from "@mui/icons-material/Shield";
  import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
  import DoneAllIcon from "@mui/icons-material/DoneAll";
  import LockIcon from "@mui/icons-material/Lock";
  import TelegramIcon from "@mui/icons-material/Telegram";
  import { LoadingButton } from "@mui/lab";
  import axios from "axios";
  import { motion } from "framer-motion";
  import { useAppDispatch, useAppSelector } from "../../app/hooks";
  import {
    disable2FA,
    enable2FA,
    selectEnabled2FA,
    selectId,
    selectTelegramID,
  } from "../../app/reducers/CurrentUserSlice";
  import Shield from "../../assets/shield.png";
  import Popup from "../../components/alerts/Popup";
  import { Toast } from "../../components/alerts/SweetAlert";
  import config from "../../config/config";
import { GetNotifications } from "../../api/NotificationDB";
import { useMutation, useQuery, useQueryClient } from "react-query";
  
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  
  const Notifications: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userID = useAppSelector(selectId);
    const [seeAll, setSeeAll] = useState<boolean>(false)

    const NotificationsQuery = useQuery([`notifications`,userID.toString()], () => GetNotifications(userID.toString()));

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
      </Box>
      {
        NotificationsQuery.status === "success" &&
        <div>
        {NotificationsQuery.data.data.filter((notification) => notification.Read === 0).length !== 0 ?
        <div>
          {NotificationsQuery.data.data.filter((notification) => notification.Read === 0).map((notification) => {
            return <></>
          })}</div> : <div className="flexcontainer"><Typography sx={{mt: "10px", mb: "10px", color: "#0a2540"}}>No unread notifications</Typography></div>}</div>
      }
      </Box>
    );
  };
  export default Notifications;
  