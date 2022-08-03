import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PageviewIcon from "@mui/icons-material/Pageview";
import { Hidden } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useNavigate } from "react-router-dom";
import { DeleteUser, FilterUsers, GetAllUsers, GetUsernames } from "../../api/UserDB";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import {
  ChangeSortColumn,
  selectSortColumn,
  selectSortOrder,
  SortAsc,
  SortDesc,
} from "../../app/reducers/UserTableFilterSlice";
import Popup from "../../components/alerts/Popup";
import { Toast } from "../../components/alerts/SweetAlert";
import SearchBarUpdated from "../../components/search/SearchBarUpdated";
import InfiniteTable from "../../components/table/InfiniteTable";
import useDebounce from "../../hooks/useDebounce";

const Users: React.FC = () => {
  const sortColumn = useAppSelector(selectSortColumn);
  const sortOrder = useAppSelector(selectSortOrder);
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole);
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    }
  }, []);
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>(null);
  const [searchName, setSearchName] = useState<string>("");
  const debouncedValue = useDebounce<string>(inputName, 500);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(DeleteUser);

  const dispatch = useAppDispatch();

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
    "Username",
    "Email Address",
    "Company",
    "User Group",
    "Phone No",
    "Action",
  ];

  const UsernamesQuery = useQuery(
    [`usernames`, debouncedValue],
    () => GetUsernames(debouncedValue),
    {
      onSuccess: (data) => {
        const namearray = data.data.map((record) => {
          return record.Name;
        });
        setSearchOptions(namearray);
      },
    }
  );

  const UsersQuery = useInfiniteQuery(
    [`users`, sortColumn, sortOrder, searchName],
    FilterUsers,
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
        url: `/user/${id}`,
        icon: <PageviewIcon fontSize="small" />,
        delete: false,
      },
      {
        name: "Edit Details",
        url: `/edituser/${id}`,
        icon: <ModeEditOutlineIcon fontSize="small" />,
        delete: false,
      },
      {
        name: "Delete",
        icon: <DeleteOutlineIcon fontSize="small" />,
        delete: true,
        deleteFunction: () => SelectDelete(id),
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

  return (
    <>
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

      <h2 className="pagetitle"> All Users </h2>
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
          onClick={() => navigate("/adduser")}
        >
          <AddCircleOutlineIcon fontSize="small" /> Add{" "}
          <Hidden smDown>User</Hidden>
        </motion.button>
      </div>

      <InfiniteTable
        headers={headers}
        query={UsersQuery}
        menu={ActionMenu}
        filter={ApplyFilter}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
      />
    </>
  );
};

export default Users;
