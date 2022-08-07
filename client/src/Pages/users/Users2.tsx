import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Fab,
  Stack,
  Typography,
  unstable_createMuiStrictModeTheme,
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
import CancelIcon from "@mui/icons-material/Cancel";
import { DeleteUser, GetAllUsers } from "../../api/UserDB";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import Popup from "../../Components/alerts/Popup";
import { Toast } from "../../Components/alerts/SweetAlert";
import CustomToolbar from "../../Components/table/CustomToolbar";

const Users2: React.FC = () => {
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole);
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    }
  }, []);

  const theme = unstable_createMuiStrictModeTheme();
  const [pageSize, setPageSize] = React.useState(25);
  // const [hoveredRow, setHoveredRow] = React.useState(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(DeleteUser);

  /*
  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = () => {
    setHoveredRow(null);
  };
  */

  const UsersQuery = useQuery(`users`, GetAllUsers);

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
          title: "User deleted successfully",
          customClass: "swalpopup",
          timer: 1500,
        });
        queryClient.invalidateQueries("users");
        // queryClient.invalidateQueries('filterusergroups');
        queryClient.invalidateQueries("usernames");
        setIdToDelete(null);
        navigate("/users");
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
    { field: "UserID", headerName: "ID", flex: 3 },
    { field: "Username", headerName: "Username", flex: 10 },
    { field: "Email", headerName: "Email Address", flex: 12 },
    { field: "CompanyName", headerName: "Company", flex: 12 },
    { field: "UserGroupName", headerName: "User Group", flex: 10 },
    { field: "MobileNo", headerName: "Phone Number", flex: 10 },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="View"
          onClick={() => navigate(`/user/${params.id}`)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => navigate(`/edituser/${params.id}`)}
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

  return (
    <Box sx={{ pl: 3, pr: 3, pt: 1, height: "100%", width: "100%" }}>
      <Popup
        showpopup={showConfirmation}
        heading="Are you sure you want to delete this user?"
        subheading="By doing so, you will delete all information associated with it such as TLoans and RMA"
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
        heading="Cannot Delete User!"
        subheading="This user cannot be deleted as they have outstanding TLoans or RMA"
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
              Users
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
                  onClick={() => navigate("/adduser")}
                  style={{ marginBottom: 10 }}
                  sx={{
                    color: "white",
                    backgroundColor: "#063970",
                    ":hover": { backgroundColor: "#031c38" },
                  }}
                >
                  Create
                  <PersonAddAlt1Icon sx={{ ml: 2 }} />
                </Fab>
              </motion.div>
            </Box>
          </Box>

          <DataGrid
            sx={{ background: "white", fontSize: 18 }}
            rows={UsersQuery.data?.data ?? []}
            columns={columns}
            getRowId={(row) => row.UserID}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            pagination
            headerHeight={50}
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  No Users
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
              navigate(`/user/${params.id}`);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Users2;
