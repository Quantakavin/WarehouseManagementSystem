import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GetNotificationGroup } from "../../api/NotificationGroupDB";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion } from "framer-motion";
import { Container } from "@mui/material";
import DataTable from "../../components/table/DataTable";
import { GridColDef } from "@mui/x-data-grid";

const ViewNotificationGroup: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [notiFeatures,setNotiFeatures] = useState<any[]>([])

  const NotificationGroupQuery = useQuery(
    [`notificationgroup${params.id}`, params.id],
    () => GetNotificationGroup(params.id), {
      onSuccess: (data) => {
        const notifeaturestoset = data.data[0].Features.map((feature) => {
          return {id: feature.NotiFeatureID, name: feature.NotiFeature, type: feature.NotiType}
        })
        setNotiFeatures(notifeaturestoset)
      }
    }
  );

  const headers: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Notification Name', width: 350 },
    { field: 'type', headerName: 'Notification Type', width: 190 }
  ];

  if (NotificationGroupQuery.isLoading || NotificationGroupQuery.isError) {
    return <CardSkeleton NoOfFields={4} />; 
  }

  return (
    <>
      {NotificationGroupQuery.status === "success" &&
        <Container className="cardcontainer shadow">
          <h2 className="cardheader">{NotificationGroupQuery.data.data[0].NotiGroupName}</h2>
          <p className="cardsubheading">{NotificationGroupQuery.data.data[0].NotiGroupDesc}</p>
          <div className="flexcontainer cardfield">
          <p className="cardfieldlabel">Notification List:</p>
          </div>
          <div className="flexcontainer cardtable">
          {NotificationGroupQuery.data.data[0].Features.length > 0? 
          <DataTable data={notiFeatures} headers={headers} />
          : <p className="cardfieldvalue">No notifications assigned</p>}
          </div>

        <div className="flexcontainer" style={{ flexDirection: "row", marginLeft: "7%", marginRight: "7%", marginTop: 30, marginBottom: 20 }}>
            <button style={{ alignSelf: "flex-start" }} className="cardbackbutton" onClick={() => navigate(-1)} type="button">
              <ArrowBackIosIcon fontSize="small" /> Back
            </button>
            <motion.button
              style={{ alignSelf: "flex-end" }}
              className="mainbutton"
              onClick={() => navigate(`/editusergroup/${params.id}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Details
            </motion.button>
          </div>
        </Container>
      }

    </>
  );
};
export default ViewNotificationGroup;
