import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Chip, Container, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GetUser } from "../../api/UserDB";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { ChangeTab } from "../../app/reducers/SidebarSlice";
import GeneralButton from "../../components/buttons/GeneralButton";
import CardSkeleton from "../../components/skeletons/CardSkeleton";

const ViewUser: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userrole = useAppSelector(selectRole);
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    } else {
      dispatch(ChangeTab({ currenttab: "Users" }));
    }
  }, [dispatch, navigate, userrole]);

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
          <Chip
            className="cardsubheading"
            label={UserQuery.data.data[0].UserGroupName}
            sx={{ fontWeight: 500 }}
          />
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
            <div className="cardfieldvalue">
              {UserQuery.data.data[0].NotificationGroups.map((n) => {
                return (
                  <Chip
                    key={n.NotiGroupID}
                    label={n.NotiGroupName}
                    sx={{ fontWeight: 500, mr: "5px", mt: "5px" }}
                  />
                );
              })}
            </div>
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
              onClick={() => navigate("/users")}
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
