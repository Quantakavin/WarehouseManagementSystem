import React, { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  DeleteUserGroup,
  FilterUserGroups,
  GetUserGroupNames,
  GetUserGroups,
} from "../../api/UserGroupDB";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PageviewIcon from "@mui/icons-material/Pageview";
import InfiniteTable from "../../components/table/InfiniteTable";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectSortColumn,
  selectSortOrder,
  ChangeSortColumn,
  SortAsc,
  SortDesc,
} from "../../app/reducers/UserGroupTableFilterSlice";
import { motion } from "framer-motion";
import SearchBarUpdated from "../../components/search/SearchBarUpdated";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Backdrop, Box, Fade, Hidden, Modal, Typography } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import CancelIcon from "@mui/icons-material/Cancel";
import { DeleteUser } from "../../api/UserDB";
import { Toast } from "../../components/alerts/SweetAlert";
import Popup from "../../components/alerts/Popup";

const UserGroups: React.FC = () => {
  const sortColumn = useAppSelector(selectSortColumn);
  const sortOrder = useAppSelector(selectSortOrder);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>(null);
  const [searchName, setSearchName] = useState<string>("");
  const debouncedValue = useDebounce<string>(inputName, 500);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(DeleteUserGroup);

  const handleSearch = (stringtosearch: string) => {
    if (inputName === "") {
      setSearchName("");
    } else {
      setSearchName(stringtosearch);
    }
  };

  const handleInputChange = (inputstring: string) => {
    setInputName(inputstring);
  };

  const headers = ["ID", "Name", "Description", "Action"];

  const UserGroupnamesQuery = useQuery(
    [`usergroupnames`, debouncedValue],
    () => GetUserGroupNames(debouncedValue),
    {
      onSuccess: (data) => {
        const namearray = data.data.map((record) => {
          return record.Name;
        });
        setSearchOptions(namearray);
      },
    }
  );

  const UserGroupsQuery = useInfiniteQuery(
    [`filterusergroups`, sortColumn, sortOrder, searchName],
    FilterUserGroups,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    }
  );

  const ActionMenu = (id: string) => {
    return [
      {
        name: "View Details",
        url: `/usergroup/${id}`,
        icon: <PageviewIcon fontSize="small" />,
        delete: false,
      },
      {
        name: "Edit Details",
        url: `/editusergroup/${id}`,
        icon: <ModeEditOutlineIcon fontSize="small" />,
        delete: false,
      },
      {
        name: "Delete",
        icon: <DeleteOutlineIcon fontSize="small" />,
        delete: true,
        deleteFunction: () => SelectDelete(id),
        // deleteFunction: () => Delete(id)
      },
    ];
  };

  const ApplyFilter = (header: string) => {
    if (header !== "Action") {
      if (sortColumn === header && sortOrder === "DESC") {
        dispatch(SortAsc());
      } else if (sortColumn === header && sortOrder === "ASC") {
        dispatch(SortDesc());
      } else {
        dispatch(ChangeSortColumn({ column: header }));
      }
    }
  };

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
          title: "User group deleted successfully",
          customClass: "swalpopup",
          timer: 1500,
        });
        queryClient.invalidateQueries("usergroups");
        queryClient.invalidateQueries("filterusergroups");
        queryClient.invalidateQueries("usergroupnames");
        setIdToDelete(null);
        navigate("/usergroups");
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

  // const popupstyle = {
  //   position: 'absolute' as 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: "600px",
  //   bgcolor: 'background.paper',
  //   border: '1px solid #d3d3d3',
  //   textAlign: 'center',
  //   boxShadow: 24,
  //   outline: 0,
  //   borderRadius: "10px",
  //   pt: 5,
  //   px: 10,
  //   pb: 5
  // };

  return (
    <>
      <Popup
        showpopup={showConfirmation}
        heading="Are you sure you want to delete this user group?"
        subheading="By doing so, you will delete all users associated with it"
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
        heading="Cannot Delete User Group!"
        subheading="This user group cannot be deleted as it contains users"
        popupimage={<CancelIcon sx={{ color: "#D11A2A", fontSize: "150px" }} />}
        closepopup={closeErrorPopup}
        buttons={
          <>
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
          </>
        }
      />
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showConfirmation}>
          <Box sx={popupstyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ fontSize: "25px" }}>
              Are you sure you want to delete this user group?
            </Typography>
            <CancelIcon sx={{ color: "#D11A2A", fontSize: "150px" }} />
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              By doing so, you will delete all users associated with it
            </Typography>
            <div className="flexcontainer" style={{ flexDirection: "row", marginTop: 20 }}>
              <button style={{ alignSelf: "flex-start" }} className="cardbackbutton" onClick={() => setShowConfirmation(false)} type="button">
                Cancel
              </button>
              <motion.button
                style={{ alignSelf: "flex-end" }}
                className="deletebutton"
                onClick={() => alert("hi")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete Anyway
              </motion.button>
            </div>
          </Box>
        </Fade>
      </Modal> 



      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showError}
        onClose={() => setShowError(true)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showError}>
          <Box sx={popupstyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ fontSize: "25px" }}>
              Cannot Delete User Group!
            </Typography>
            <CancelIcon sx={{ color: "#D11A2A", fontSize: "150px" }} />
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              This user group cannot be deleted as it contains users
            </Typography>
            <div className="flexcontainer" style={{ flexDirection: "row", marginTop: 20 }}>
              <button style={{ alignSelf: "flex-start", marginLeft: "auto", fontWeight: 700, color: "#0A2540" }} className="buttonremovestyling" onClick={() => setShowError(false)} type="button">
                Close
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
      */}
      <h2 className="pagetitle"> User Groups </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SearchBarUpdated
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          searchoptions={searchOptions}
        />
        <motion.button
          className="addbutton"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ alignSelf: "flex-end" }}
          onClick={() => navigate("/addusergroup")}
        >
          <AddCircleOutlineIcon fontSize="small" /> Add{" "}
          <Hidden smDown>User Group</Hidden>
        </motion.button>
      </div>

      <InfiniteTable
        headers={headers}
        query={UserGroupsQuery}
        menu={ActionMenu}
        filter={ApplyFilter}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
      />
    </>
  );
};
export default UserGroups;
