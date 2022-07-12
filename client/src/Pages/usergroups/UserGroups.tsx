import React from "react";
import { useInfiniteQuery } from "react-query";
import { GetUserGroups } from "../../api/UserGroupDB";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PageviewIcon from '@mui/icons-material/Pageview';
import TableNew from "../../components/table/TableNew";

const UserGroups: React.FC = () => {
    const headers = [
        "ID",
        "Name",
        "Description",
        "Action"
    ];
  const UserGroupsQuery = useInfiniteQuery(`usergroups`, GetUserGroups,
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

  return (
    <>
      <h2 className="pagetitle"> User Groups </h2>

      {UserGroupsQuery.isLoading || UserGroupsQuery.isError ? null :
        <>
        <TableNew headers={headers} pages={UserGroupsQuery.data.pages} query={UserGroupsQuery} menu={ActionMenu} />
        </>
      }
    </>
  )

};
export default UserGroups;
