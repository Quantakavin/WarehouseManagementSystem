import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  CircularProgress,
  Fab,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridFilterModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import {
  DeleteNotificationGroup,
  GetNotificationGroups,
} from "../../api/NotificationGroupDB";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { ChangeTab } from "../../app/reducers/SidebarSlice";
import Popup from "../../components/alerts/Popup";
import { Toast } from "../../components/alerts/SweetAlert";
import CustomToolbar from "../../components/table/CustomToolbar";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Notification Groups Found</Box>
    </StyledGridOverlay>
  );
};

const NotificationGroups2: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation(DeleteNotificationGroup);
  const userrole = useAppSelector(selectRole);
  const [pageSize, setPageSize] = React.useState(25);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>(null);
  const [notificationGroups, setNotificationGroups] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    } else {
      dispatch(ChangeTab({ currenttab: "Notification Groups" }));
    }
  }, [dispatch, navigate, userrole]);

  const NotificationGroupQuery = useQuery(
    "notificationgroups",
    GetNotificationGroups,
    {
      onSuccess: (data) => {
        setNotificationGroups(data.data);
      },
    }
  );

  // const [hoveredRow, setHoveredRow] = React.useState(null);
  // useEffect(() => {
  //   setLoading(true);
  //     // declare the async data fetching function
  //     axios
  //       .get(`${config.baseURL}/notificationgroups`, {
  //         method: "get",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((response) => setNotificationGroups(response.data))
  //       .then(() => setLoading(false));
  // }, []);

  const SelectDelete = (id: string) => {
    setIdToDelete(id);
    setShowConfirmation(true);
  };

  const Delete = (id: string) => {
    mutation.mutate(id, {
      onError: () => {
        setShowConfirmation(false);
        setShowError(true);
        setIdToDelete(null);
      },
      onSuccess: () => {
        setShowConfirmation(false);
        Toast.fire({
          icon: "success",
          title: "Notification group deleted successfully",
          customClass: "swalpopup",
          timer: 1500,
        });
        queryClient.invalidateQueries("notificationgroups");
        queryClient.invalidateQueries("notificationgroupnames");
        setIdToDelete(null);
        navigate("/notificationgroups");
      },
    });
  };

  const closeConfirmationPopup = () => {
    setShowConfirmation(false);
    setIdToDelete(null);
  };

  const closeErrorPopup = () => {
    setShowError(false);
    setIdToDelete(null);
  };

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      {
        columnField: "Company Name",
        operatorValue: "=",
        value: "SERVO_LIVE",
      },
    ],
  });

  const columns = [
    { field: "NotiGroupID", headerName: "ID", flex: 2 },
    { field: "NotiGroupName", headerName: "Name", flex: 15 },
    { field: "NotiGroupDesc", headerName: "Description", flex: 35 },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="View"
          onClick={() => navigate(`/notificationgroup/${params.id}`)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => navigate(`/editnotificationgroup/${params.id}`)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => SelectDelete(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  /*
  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };
  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };
  */

  return (
    <Box sx={{ pl: 3, pr: 3, pt: 1, height: "100%", width: "100%" }}>
      <Popup
        showpopup={showConfirmation}
        heading="Are you sure you want to delete this notification group?"
        subheading="By doing so, you will delete all notifications associated with it"
        popupimage={<CancelIcon sx={{ color: "#D11A2A", fontSize: "150px" }} />}
        closepopup={closeConfirmationPopup}
        buttons={
          <>
            <button
              style={{ alignSelf: "flex-start" }}
              className="cardbackbutton"
              onClick={() => setShowConfirmation(false)}
              type="button"
            >
              Cancel
            </button>
            <motion.button
              style={{
                alignSelf: "flex-end",
                width: "auto",
                minWidth: "155px",
              }}
              className="deletebutton"
              onClick={() => Delete(idToDelete)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mutation.isLoading ? (
                <CircularProgress size={15} color="inherit" />
              ) : (
                "Delete Anyway"
              )}
            </motion.button>
            {/* <motion.button
              style={{ alignSelf: "flex-end" }}
              className="deletebutton"
              onClick={() => Delete(idToDelete)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete Anyway
            </motion.button> */}
          </>
        }
      />

      <Popup
        showpopup={showError}
        heading="Cannot Delete Notification Group!"
        subheading="This notification group cannot be deleted as it has already been assigned to a user"
        popupimage={<CancelIcon sx={{ color: "#D11A2A", fontSize: "150px" }} />}
        closepopup={closeErrorPopup}
        buttons={
          <button
            style={{
              alignSelf: "flex-start",
              marginLeft: "auto",
              fontWeight: 700,
              color: "#0A2540",
            }}
            className="buttonremovestyling"
            onClick={() => setShowError(false)}
            type="button"
          >
            Close
          </button>
        }
      />
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            component="span"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
            >
              Notification Groups
            </Typography>
            <Box>
              <motion.div
                className="animatable"
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.9 }}
              >
                <Fab
                  variant="extended"
                  aria-label="add"
                  onClick={() => navigate("/addnotificationgroup")}
                  style={{ marginBottom: 10 }}
                  sx={{
                    color: "white",
                    backgroundColor: "#063970",
                    ":hover": { backgroundColor: "#031c38" },
                  }}
                >
                  Create
                  <NotificationAddIcon sx={{ ml: 2 }} />
                </Fab>
              </motion.div>
            </Box>
          </Box>
          <DataGrid
            loading={NotificationGroupQuery.isLoading}
            sx={{ background: "white", fontSize: 18 }}
            rows={notificationGroups}
            columns={columns}
            getRowId={(row) => row.NotiGroupID}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            pagination
            headerHeight={50}
            // rowHeight={70}
            // getRowHeight={() => "auto"}
            components={{
              LoadingOverlay: LinearProgress,
              Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
              NoResultsOverlay: CustomNoRowsOverlay,
            }}
            componentsProps={
              {
                /*
              row: {
                onMouseEnter: onMouseEnterRow,
                onMouseLeave: onMouseLeaveRow,
              },
              */
              }
            }
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) =>
              setFilterModel(newFilterModel)
            }
            onRowClick={(params: GridRowParams) => {
              navigate(`/notificationgroup/${params.id}`);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default NotificationGroups2;
