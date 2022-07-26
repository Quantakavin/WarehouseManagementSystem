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
import { GetAllRMA } from "../../api/RmaDB";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PageviewIcon from '@mui/icons-material/Pageview';
import ActionMenu from "../../components/table/ActionMenu";
import LoadMoreButton from "../../components/table/LoadMoreButton";
import RmaSearch from "../../components/search/RmaSearch"
import TableNew from "../../components/table/TableNew";

const Rmatabs2: React.FC = () => {
  const headers = [
    "RMA No.",
    "Date",
    "Company",
    "Customer Email",
    "Actions"
  ];
  const RmaQuery = useInfiniteQuery(`rma`, GetAllRMA,
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
          url: `/rmaDetails/${id}`,
          icon: <PageviewIcon fontSize="small" />,
          delete: false
        },
        // {
        //   name: "Edit Details",
        //   url: `/edituser/${id}`,
        //   icon: <ModeEditOutlineIcon fontSize="small" />,
        //   delete: false
        // },
        // {
        //   name: "Delete",
        //   icon: <DeleteOutlineIcon fontSize="small" />,
        //   delete: true
        // },
      ]
    )
  }

  return (
    <>
      <h2 className="pagetitle"> RMA Requests </h2>
      <RmaSearch />

      {RmaQuery.isLoading || RmaQuery.isError ? null :
      <>
        <TableNew headers={headers} pages={RmaQuery.data.pages} query={RmaQuery} menu={ActionMenu} />
        </>
      }
    </>
  )

};
export default Rmatabs2;