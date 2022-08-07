import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Chip, Container, Divider } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GetNotificationGroup } from "../../api/NotificationGroupDB";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import GeneralButton from "../../Components/buttons/GeneralButton";
import CardSkeleton from "../../Components/skeletons/CardSkeleton";
import DataTable from "../../Components/table/DataTable";

const ViewNotificationGroup: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole);
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    }
  }, []);
  const [notiFeatures, setNotiFeatures] = useState<any[]>([]);

  const NotificationGroupQuery = useQuery(
    [`notificationgroup${params.id}`, params.id],
    () => GetNotificationGroup(params.id),
    {
      onSuccess: (data) => {
        const notifeaturestoset = data.data[0].Features.map((feature) => {
          return {
            id: feature.NotiFeatureID,
            name: feature.NotiFeature,
            type: feature.NotiType,
          };
        });
        setNotiFeatures(notifeaturestoset);
      },
    }
  );

  const headers: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Notification Name", width: 400 },
    { field: "type", headerName: "Notification Type", width: 150 },
  ];

  if (NotificationGroupQuery.isLoading || NotificationGroupQuery.isError) {
    return <CardSkeleton NoOfFields={4} />;
  }

  return (
    <>
      {NotificationGroupQuery.status === "success" && (
        <Container className="cardcontainer shadow">
          <h2 className="cardheader">
            {NotificationGroupQuery.data.data[0].NotiGroupName}
          </h2>
          <div
            className="cardsubheading"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                NotificationGroupQuery.data.data[0].NotiGroupDesc
              ),
            }}
          />
          <div className="cardfield" style={{marginTop: 20}}>
            <p className="cardfieldlabel">Company</p>
            <p className="cardfieldvalue">
              {NotificationGroupQuery.data.data[0].CompanyName}
            </p>
          </div>
          <Divider sx={{ mb: 3 }}>
              <Chip label="Notifications" sx={{ fontWeight: 500 }} />
          </Divider>
          <div className="flexcontainer cardfield" style={{marginTop: 20, marginBottom: 10}}>
            <p className="cardfieldlabel">Notification List:</p>
          </div>
          <div className="flexcontainer cardtable">
            {NotificationGroupQuery.data.data[0].Features.length > 0 ? (
              <DataTable data={notiFeatures} headers={headers} />
            ) : (
              <p className="cardfieldvalue">No notifications assigned</p>
            )}
          </div>

          <div
            className="flexcontainer"
            style={{
              flexDirection: "row",
              marginLeft: "7%",
              marginRight: "7%",
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <button
              style={{ alignSelf: "flex-start" }}
              className="cardbackbutton"
              onClick={() => navigate(-1)}
              type="button"
            >
              <ArrowBackIosIcon fontSize="small" /> Back
            </button>
            <GeneralButton 
            text="Edit Details" 
            clickfunction={() => navigate(`/editnotificationgroup/${params.id}`)}
            />
          </div>
        </Container>
      )}
    </>
  );
};
export default ViewNotificationGroup;
