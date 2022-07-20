import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/material";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import { GetUser } from "../../api/UserDB";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const UserQuery = useQuery(
    [`user${localStorage.getItem("user_id")}`, localStorage.getItem("user_id")],
    () => GetUser(localStorage.getItem("user_id"))
  );

  if (UserQuery.isLoading || UserQuery.isError) {
    return <CardSkeleton NoOfFields={4} />;
  }

  return (
    <div>
      {UserQuery.status === "success" && (
        <Container className="cardcontainer shadow">
          <h2 className="cardheader">{UserQuery.data.data[0].Username}</h2>
          <p className="cardsubheading">
            {UserQuery.data.data[0].UserGroupName}
          </p>
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
          </div>
        </Container>
      )}
    </div>
  );
};
export default Profile;
