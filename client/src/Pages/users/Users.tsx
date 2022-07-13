import React from "react";
import { useInfiniteQuery } from "react-query";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PageviewIcon from "@mui/icons-material/Pageview";
import { GetAllUsers } from "../../api/UserDB";
import SearchBarUpdated from "../../components/search/SearchBarUpdated";
import TableNew from "../../components/table/TableNew";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectSortColumn,
  selectSortOrder,
  ChangeSortColumn,
  SortAsc,
  SortDesc,
} from "../../app/reducers/UserTableFilterSlice";

const Users: React.FC = () => {
  const sortColumn = useAppSelector(selectSortColumn);
  const sortOrder = useAppSelector(selectSortOrder);

  const dispatch = useAppDispatch();

  const headers = [
    "ID",
    "Username",
    "Email Address",
    "Company",
    "User Group",
    "Phone No",
    "Action",
  ];
  const UsersQuery = useInfiniteQuery(
    [`users`, sortColumn, sortOrder],
    GetAllUsers,
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

  return (
    <>
      <h2 className="pagetitle"> All Users </h2>
      <SearchBarUpdated />
      <TableNew
        headers={headers}
        query={UsersQuery}
        menu={ActionMenu}
        filter={ApplyFilter}
      />
    </>
  );

  // <TableBody>
  // {UsersQuery.data.pages.map((group, i) => (
  //   <React.Fragment key={i}>
  //     {group.response.data.map(row => (
  //       <TableRow
  //         key={row.ID}
  //         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //       >
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row.ID}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row.Username}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row["Email Address"]}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row.Company}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row["User Group"]}
  //         </TableCell>
  //         <TableCell sx={{ color: "#0A2540" }} align="left">
  //           {row["Phone No"]}
  //         </TableCell>
  //         <ActionMenu
  //           items={[
  //             {
  //               name: "View Details",
  //               url: `/user/${row.ID}`,
  //               icon: <PageviewIcon fontSize="small" />,
  //               delete: false
  //             },
  //             {
  //               name: "Edit Details",
  //               url: `/edituser/${row.ID}`,
  //               icon: <ModeEditOutlineIcon fontSize="small" />,
  //               delete: false
  //             },
  //             {
  //               name: "Delete",
  //               icon: <DeleteOutlineIcon fontSize="small" />,
  //               delete: true
  //             },
  //           ]}
  //         />
  //       </TableRow>
  //     ))}

  //   </React.Fragment>
  // ))}
  // </TableBody>
};

export default Users;