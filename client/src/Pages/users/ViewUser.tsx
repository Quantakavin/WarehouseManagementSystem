import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Chip, Container, Divider } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { GetUser } from "../../api/UserDB";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import CardSkeleton from "../../Components/skeletons/CardSkeleton";
import GeneralButton from "../../Components/buttons/GeneralButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ViewUser: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole);
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    }
  }, []);

  const UserQuery = useQuery([`user${params.id}`, params.id], () =>
    GetUser(params.id)
  );

  if (UserQuery.isLoading || UserQuery.isError) {
    return <CardSkeleton NoOfFields={4} />;
  }

  return (
    <div>
      {UserQuery.status === "success" && (
        <Container className="cardcontainer shadow">
          <h2 className="cardheader">{UserQuery.data.data[0].Username}</h2>
          <Chip className="cardsubheading" label={UserQuery.data.data[0].UserGroupName} sx={{ fontWeight: 500 }} />
          <Divider sx={{ mb: 3 }}>
              <Chip label="Details" sx={{ fontWeight: 500 }} />
          </Divider>
          <div className="cardfield">
            <p className="cardfieldlabel">Company</p>
            <p className="cardfieldvalue">
              {UserQuery.data.data[0].CompanyName}
            </p>
          </div>
          <div className="cardfield">
            <p className="cardfieldlabel">Email</p>
            <p className="cardfieldvalue">{UserQuery.data.data[0].Email}</p>
          </div>
          <div className="cardfield">
            <p className="cardfieldlabel">Phone No</p>
            <p className="cardfieldvalue">{UserQuery.data.data[0].MobileNo}</p>
          </div>
          <div className="cardfield">
            <p className="cardfieldlabel">Notification Groups</p>
            <p className="cardfieldvalue">
              {UserQuery.data.data[0].NotificationGroups.map((n) => {
                return <Chip label={n.NotiGroupName} sx={{ fontWeight: 500, mr: "5px", mt: "5px"}} />
              })}
            </p>
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
            {/* <div style={{alignSelf: "flex-start"}}>
            <GeneralButton
             starticon={<ArrowBackIosNewIcon />}
              text="Back"
              clickfunction={() => navigate(-1)}
            />
            </div> */}
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
            clickfunction={() => navigate(`/edituser/${params.id}`)}
            />
          </div>
        </Container>
      )}
    </div>
  );
};
export default ViewUser;
