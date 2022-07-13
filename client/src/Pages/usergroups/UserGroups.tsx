import React from "react";
import { useInfiniteQuery } from "react-query";
import { GetUserGroups } from "../../api/UserGroupDB";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PageviewIcon from '@mui/icons-material/Pageview';
import TableNew from "../../components/table/TableNew";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectSortColumn,
  selectSortOrder,
  ChangeSortColumn,
  SortAsc,
  SortDesc,
} from "../../app/reducers/UserGroupTableFilterSlice";

const UserGroups: React.FC = () => {

  const sortColumn = useAppSelector(selectSortColumn);
  const sortOrder = useAppSelector(selectSortOrder);
  const dispatch = useAppDispatch();

    const headers = [
        "ID",
        "Name",
        "Description",
        "Action"
    ];
  const UserGroupsQuery = useInfiniteQuery([`usergroups`, sortColumn, sortOrder], GetUserGroups,
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

      {UserGroupsQuery.isLoading || UserGroupsQuery.isError ? null :
        <>
        <TableNew headers={headers} query={UserGroupsQuery} menu={ActionMenu} filter={ApplyFilter} />
        </>
      }
    </>
  )

};
export default UserGroups;
