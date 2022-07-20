import React, { useState } from "react";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { FilterUserGroups, GetUserGroupNames, GetUserGroups } from "../../api/UserGroupDB";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PageviewIcon from '@mui/icons-material/Pageview';
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { Backdrop, Box, Fade, Hidden, Modal, Typography } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import CancelIcon from '@mui/icons-material/Cancel';
import { DeleteUser } from "../../api/UserDB";

const UserGroups: React.FC = () => {

  const sortColumn = useAppSelector(selectSortColumn);
  const sortOrder = useAppSelector(selectSortOrder);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>(null);
  const [searchName, setSearchName] = useState<string>("");
  const debouncedValue = useDebounce<string>(inputName, 500);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(true);

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


  const headers = [
    "ID",
    "Name",
    "Description",
    "Action"
  ];


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

  const UserGroupsQuery = useInfiniteQuery([`filterusergroups`, sortColumn, sortOrder, searchName], FilterUserGroups,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });


  const ActionMenu = (id: string) => {
    return (
      [
        {
          name: "View Details",
          url: `/usergroup/${id}`,
          icon: <PageviewIcon fontSize="small" />,
          delete: false
        },
        {
          name: "Edit Details",
          url: `/editusergroup/${id}`,
          icon: <ModeEditOutlineIcon fontSize="small" />,
          delete: false
        },
        {
          name: "Delete",
          icon: <DeleteOutlineIcon fontSize="small" />,
          delete: true
        },
      ]
    )
  }

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

  // const DeleteUserGroup = (id: number) => {
  //   const mutation = useMutation((id) => DeleteUserGroup(id));
  //   mutation.mutate(id, {
  //     onSuccess: () => {
  //       Toast.fire({
  //         icon: "success",
  //         title: "User group deleted successfully",
  //         customClass: "swalpopup",
  //         timer: 1500
  //       });
  //       navigate("/usergroups");
  //     },
  //   });

  // }

  const confirmationpopupstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "600px",
    bgcolor: 'background.paper',
    border: '1px solid #d3d3d3',
    textAlign: 'center',
    boxShadow: 24,
    outline: 0,
    borderRadius: "10px",
    pt: 5,
    px: 10,
    pb: 5
  };

  return (
    <>

<Modal
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
          <Box sx={confirmationpopupstyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{fontSize: "25px"}}>
              Are you sure you want to delete this user?
            </Typography>
            <CancelIcon sx={{color: "#D11A2A", fontSize: "150px"}}/>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            By doing so, you will delete all information associated with it such as TLoans and RMAs
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

      <h2 className="pagetitle"> User Groups </h2>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
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
          <AddCircleOutlineIcon fontSize="small" /> Add <Hidden smDown>User Group</Hidden>
        </motion.button>

      </div>

      <InfiniteTable headers={headers} query={UserGroupsQuery} menu={ActionMenu} filter={ApplyFilter} sortColumn={sortColumn} sortOrder={sortOrder} />
    </>
  )

};
export default UserGroups;

