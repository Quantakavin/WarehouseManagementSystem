import React, { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
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
import { Hidden } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";

const UserGroups: React.FC = () => {

  const sortColumn = useAppSelector(selectSortColumn);
  const sortOrder = useAppSelector(selectSortOrder);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>(null);
  const [searchName, setSearchName] = useState<string>("");
  const debouncedValue = useDebounce<string>(inputName, 500);

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

  return (
    <>
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

