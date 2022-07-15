import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GetUserGroup } from "../../api/UserGroupDB";
import CardField from "../../components/cards/CardField";
import CardContainer from "../../components/cards/CardContainer";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion } from "framer-motion";
import { Container } from "@mui/material";
import CardTable from "../../components/cards/CardTable";

const ViewUserGroup: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const UserGroupQuery = useQuery(
    [`usergroup${params.id}`, params.id],
    () => GetUserGroup(params.id)
  );

  const headers = [
    "ID",
    "Feature Name",
    "Access Rights"
  ];

  if (UserGroupQuery.isLoading || UserGroupQuery.isError) {
    return <CardSkeleton NoOfFields={4} />; 
  }

  return (
    <>
      {UserGroupQuery.status === "success" &&
        <Container className="cardcontainer shadow">
          <h2 className="cardheader">{UserGroupQuery.data.data[0].UserGroupName}</h2>
          <p className="cardsubheading">{UserGroupQuery.data.data[0].UserGroupDesc}</p>
          <div className="flexcontainer cardfield">
          <p className="cardfieldlabel">Feature List:</p>
          </div>
          <div className="flexcontainer cardtable">
          {UserGroupQuery.data.data[0].Features.length > 0? 
          <CardTable data={UserGroupQuery.data.data[0].Features} headers={headers} />
          : <p className="cardfieldvalue">No features assigned</p>}
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
        // <CardContainer header={UserQuery.data.data[0].Username} subheading={UserQuery.data.data[0].UserGroupName}>
        //   <CardField label="Company:" value={UserQuery.data.data[0].CompanyName} />
        //   <CardField label="Email:" value={UserQuery.data.data[0].Email} />
        //   <CardField label="Phone No:" value={UserQuery.data.data[0].MobileNo} />
        //   <CardField label="Notification Groups:" value={UserQuery.data.data[0].NotificationGroups.map((n: { NotiGroupName: string }) => { return n.NotiGroupName }).join(", ")} />
        //   <div className="flexcontainer" style={{ flexDirection: "row", marginLeft: "7%", marginRight: "7%", marginTop: 30, marginBottom: 20 }}>
        //     <button style={{ alignSelf: "flex-start" }} className="cardbackbutton" onClick={() => navigate(-1)} type="button">
        //       <ArrowBackIosIcon fontSize="small" /> Back
        //     </button>
        //     <motion.button
        //       style={{ alignSelf: "flex-end" }}
        //       className="mainbutton"
        //       onClick={() => navigate(`/edituser/${params.id}`)}
        //       whileHover={{ scale: 1.05 }}
        //       whileTap={{ scale: 0.95 }}
        //     >
        //       Edit Details
        //     </motion.button>
        //   </div>
        // </CardContainer>
      }

    </>
  );
};
export default ViewUserGroup;
