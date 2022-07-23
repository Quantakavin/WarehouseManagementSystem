import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GetUserGroup } from "../../api/UserGroupDB";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import DataTable from "../../components/table/DataTable";

const ViewUserGroup: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole)
  useEffect(() => {
    if (userrole != "Admin") {
      navigate('/403');
    }
  }, []);
  const [features, setFeatures] = useState<any[]>([]);

  const UserGroupQuery = useQuery(
    [`usergroup${params.id}`, params.id],
    () => GetUserGroup(params.id),
    {
      onSuccess: (data) => {
        const featurestoset = data.data[0].Features.map((feature) => {
          return {
            id: feature.FeatureID,
            name: feature.FeatureName,
            access: feature.FeatureRight,
          };
        });
        setFeatures(featurestoset);
      },
    }
  );

  const headers: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Feature Name", width: 350 },
    { field: "access", headerName: "Access Rights", width: 190 },
  ];

  if (UserGroupQuery.isLoading || UserGroupQuery.isError) {
    return <CardSkeleton NoOfFields={4} />;
  }

  return (
    <>
      {UserGroupQuery.status === "success" && (
        <Container className="cardcontainer shadow">
          <h2 className="cardheader">
            {UserGroupQuery.data.data[0].UserGroupName}
          </h2>
          <p className="cardsubheading">
            {UserGroupQuery.data.data[0].UserGroupDesc}
          </p>
          <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Feature List:</p>
          </div>
          <div className="flexcontainer cardtable">
            {UserGroupQuery.data.data[0].Features.length > 0 ? (
              <DataTable data={features} headers={headers} />
            ) : (
              <p className="cardfieldvalue">No features assigned</p>
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
      )}
    </>
  );
};
export default ViewUserGroup;
