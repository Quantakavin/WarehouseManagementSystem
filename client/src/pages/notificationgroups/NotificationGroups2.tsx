import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Fab, LinearProgress, Stack, Typography } from "@mui/material";
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
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import Popup from "../../components/alerts/Popup";
import { Toast } from "../../components/alerts/SweetAlert";
import CustomToolbar from "../../components/table/CustomToolbar";

const NotificationGroups2: React.FC = () => {
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole);
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    }
  }, []);
  const [pageSize, setPageSize] = React.useState(25);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>(null);
  const [tableLoading, setTableLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(DeleteNotificationGroup);

  // const [hoveredRow, setHoveredRow] = React.useState(null);

  const NotificationGroupsQuery = useQuery(
    `notificatiobgroups`,
    GetNotificationGroups
  );

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
              style={{ alignSelf: "flex-end" }}
              className="deletebutton"
              onClick={() => Delete(idToDelete)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete Anyway
            </motion.button>
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
            loading={tableLoading}
            sx={{ background: "white", fontSize: 18 }}
            rows={NotificationGroupsQuery.data?.data ?? []}
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
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  No Notification Groups
                </Stack>
              ),
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
