import React from "react";
import { useInfiniteQuery } from "react-query";
import { GetNotificationGroups } from "../../api/NotificationGroupDB";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PageviewIcon from '@mui/icons-material/Pageview';
import TableNew from "../../components/table/TableNew";

const NotificationGroups: React.FC = () => {
  const headers = [
    "ID",
    "Name",
    "Description",
    "Action"
  ];
  const NotificationGroupsQuery = useInfiniteQuery(`notificationgroups`, GetNotificationGroups,
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

  return (
    <>
      <h2 className="pagetitle"> Notification Groups </h2>

      {NotificationGroupsQuery.isLoading || NotificationGroupsQuery.isError ? null :
        <>
        <TableNew headers={headers} pages={NotificationGroupsQuery.data.pages} query={NotificationGroupsQuery} menu={ActionMenu} />
        </>
      }
    </>
  )

};
export default NotificationGroups;
