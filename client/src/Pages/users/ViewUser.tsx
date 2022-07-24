import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GetUser } from "../../api/UserDB";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import DOMPurify from 'dompurify';

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
          <div className="cardsubheading" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(UserQuery.data.data[0].UserGroupName)}}/>
          <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Company</p>
            <p className="cardfieldvalue">
              {UserQuery.data.data[0].CompanyName}
            </p>
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
            <p className="cardfieldvalue">
              {UserQuery.data.data[0].NotificationGroups.map((n) => {
                return n.NotiGroupName;
              }).join(", ")}
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
            <button
              style={{ alignSelf: "flex-start" }}
              className="cardbackbutton"
              onClick={() => navigate(-1)}
              type="button"
            >
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
      )}
    </div>
  );
};
export default ViewUser;
