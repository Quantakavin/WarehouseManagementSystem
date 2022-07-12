import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, Container } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PageviewIcon from "@mui/icons-material/Pageview";
import { GetAllUsers } from "../../api/UserDB";
import ActionMenu from "../../components/table/ActionMenu";
import LoadMoreButton from "../../components/table/LoadMoreButton";
import SearchBarUpdated from "../../components/search/SearchBarUpdated";
import TableNew from "../../components/table/TableNew";

const Users: React.FC = () => {
  const headers = [
    "ID",
    "Username",
    "Email Address",
    "Company",
    "User Group",
    "Phone No",
    "Action",
  ];
  const UsersQuery = useInfiniteQuery(`users`, GetAllUsers, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
  });

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

  return (
    <>
      <h2 className="pagetitle"> All Users </h2>
      <SearchBarUpdated />

      {UsersQuery.isLoading || UsersQuery.isError ? null : (
        <TableNew
          headers={headers}
          pages={UsersQuery.data.pages}
          query={UsersQuery}
          menu={ActionMenu}
        />
      )}
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
