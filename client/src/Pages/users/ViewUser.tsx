import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GetUser } from "../../api/UserDB";
import CardField from "../../components/cards/CardField";
import CardContainer from "../../components/cards/CardContainer";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion } from "framer-motion";
import { Container } from "@mui/material";

const ViewUser: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const UserQuery = useQuery(
    [`user${params.id}`, params.id],
    () => GetUser(params.id)
  );

  if (UserQuery.isLoading || UserQuery.isError) {
    return <CardSkeleton NoOfFields={4} />;
  }

  return (
    <>
      {UserQuery.status === "success" &&
        <Container className="cardcontainer shadow">
          <h2 className="cardheader">{UserQuery.data.data[0].Username}</h2>
          <p className="cardsubheading">{UserQuery.data.data[0].UserGroupName}</p>
          <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Company</p>
            <p className="cardfieldvalue">{UserQuery.data.data[0].CompanyName}</p>
          </div>
          <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Email</p>
            <p className="cardfieldvalue">{UserQuery.data.data[0].Email}</p>
          </div>
          <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Phone No</p>
            <p className="cardfieldvalue">{UserQuery.data.data[0].MobileNo}</p>
          </div>
          <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Notification Groups</p>
            <p className="cardfieldvalue">{UserQuery.data.data[0].NotificationGroups.map((n) => { return n.NotiGroupName }).join(", ")}</p>
          </div>
        <div className="flexcontainer" style={{ flexDirection: "row", marginLeft: "7%", marginRight: "7%", marginTop: 30, marginBottom: 20 }}>
            <button style={{ alignSelf: "flex-start" }} className="cardbackbutton" onClick={() => navigate(-1)} type="button">
              <ArrowBackIosIcon fontSize="small" /> Back
            </button>
            <motion.button
              style={{ alignSelf: "flex-end" }}
              className="mainbutton"
              onClick={() => navigate(`/edituser/${params.id}`)}
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
export default ViewUser;
