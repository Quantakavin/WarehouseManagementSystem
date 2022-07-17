import React from "react";
import { useInfiniteQuery } from "react-query";
import { GetNotificationGroups } from "../../api/NotificationGroupDB";
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
} from "../../app/reducers/NotiGroupTableFilterSlice";
import SearchBarUpdated from "../../components/search/SearchBarUpdated";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Hidden } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotificationGroups: React.FC = () => {

  const sortColumn = useAppSelector(selectSortColumn);
  const sortOrder = useAppSelector(selectSortOrder);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();


  const headers = [
    "ID",
    "Name",
    "Description",
    "Action"
  ];
  const NotificationGroupsQuery = useInfiniteQuery([`notificationgroups`, sortColumn, sortOrder], GetNotificationGroups,
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
          url: `/notificationgroup/${id}`,
          icon: <PageviewIcon fontSize="small" />,
          delete: false
        },
        {
          name: "Edit Details",
          url: `/editnotificationgroup/${id}`,
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
      <h2 className="pagetitle"> Notification Groups </h2>

      <div style={{display: "flex", flexDirection: "row", alignItems: "center",justifyContent: "space-between"}} >
      <SearchBarUpdated/>
        <motion.button
          className="addbutton"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{alignSelf: "flex-end"}}
          onClick={() => navigate("/addnotificationgroup")}
        >
          <AddCircleOutlineIcon fontSize="small"/> Add <Hidden smDown>Notification Group</Hidden>
        </motion.button>

      </div>
        <InfiniteTable headers={headers} query={NotificationGroupsQuery} menu={ActionMenu} filter={ApplyFilter} sortColumn={sortColumn} sortOrder={sortOrder}/>
    </>
  )

};
export default NotificationGroups;
