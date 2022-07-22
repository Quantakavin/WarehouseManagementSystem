import { Tab, Tabs, Box, Grow } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import "react-tabs/style/react-tabs.css";
import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { Link, Navigate, useNavigate } from "react-router-dom";
import SubmitButton from "../form/SubmitButton";
import { useQuery, useInfiniteQuery } from "react-query";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PageviewIcon from "@mui/icons-material/Pageview";
import ActionMenu from "../../components/table/ActionMenu";
import {
  GetCurrent,
  GetDraft,
  GetPending,
  GetHistory,
} from "../../api/TLoanDB";
import TableNew from "../table/InfiniteTable";
import EmptyTable from "../table/EmptyTable";
import { selectRole, selectId } from "../../app/reducers/CurrentUserSlice";
import { useAppSelector } from "../../app/hooks";
import { NavigationRounded } from "@mui/icons-material";
import Button from "@mui/material/Button";
import TextField from "@mui/material";

const TLoanTabs: React.FC = () => {
  const headers = [
    "Loan No.",
    "Start Date",
    "End Date",
    "Company Name",
    "Customer Email",
    "Actions",
  ];
  const LoansQuery = useInfiniteQuery(`loans`, GetCurrent, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
  });

  const PendingQuery = useInfiniteQuery(`pending`, GetPending, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
  });

  const DraftQuery = useInfiniteQuery(`draft`, GetDraft, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
  });

  const HistoryQuery = useInfiniteQuery(`history`, GetHistory, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
  });

  const ActionMenu = (id: string) => {
    return [
      {
        name: "View Details",
        url: `/tloandetails2/${id}`,
        icon: <PageviewIcon fontSize="small" />,
        delete: false,
      },
      {
        name: "Edit Details",
        url: `/tloan/edit/${id}`,
        icon: <ModeEditOutlineIcon fontSize="small" />,
        delete: false,
      },
      // {
      //   name: "Delete",
      //   icon: <DeleteOutlineIcon fontSize="small" />,
      //   delete: true
      // },
    ];
  };

  const [value, setValue] = useState(0); // first tab

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const userRole = useAppSelector(selectRole);

  const navigate = useNavigate();

  switch (userRole) {
    case "Admin": {
      return (
        <>
          <Box sx={{ margin: 2, display: "flex" }}>
            <h2 className="pagetitle">TLoans </h2>

            <Button
              variant="contained"
              onClick={() => navigate("/newtloan")}
              sx={{
                marginTop: 5,
                marginLeft: "auto",
                marginRight: 10,
                color: "white",
                backgroundColor: "#063970",
                width: 150,
                height: 40,
                "& button:hover": { backgroundColor: "#063970" },
              }}
            >
              Apply TLoan
            </Button>
          </Box>

          <TabContext value={value || "1"}>
            <Box sx={{ marginLeft: -3 }}>
              <Tabs
                selectionFollowsFocus={true}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#D97D54",
                  },
                }}
                sx={{
                  "& button:focus": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                  "& button:active": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                  "& button.Mui-selected": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                }}
                aria-label="basic tabs example"
                centered
              >
                <Tab
                  label="Current"
                  value="1"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="Pending"
                  value="2"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="Drafts"
                  value="3"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="History"
                  value="4"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
              </Tabs>
            </Box>

            <Box sx={{ marginTop: -5 }}>
              <TabPanel value="1">
                {LoansQuery.isLoading || LoansQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={LoansQuery.data.pages}
                      query={LoansQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="2">
                {PendingQuery.isLoading || PendingQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={PendingQuery.data.pages}
                      query={PendingQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="3">
                {DraftQuery.isLoading || DraftQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={DraftQuery.data.pages}
                      query={DraftQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="4">
                {HistoryQuery.isLoading || HistoryQuery.isError ? (
                  <>
                    <EmptyTable headers={headers} />
                  </>
                ) : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={HistoryQuery.data.pages}
                      query={HistoryQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
            </Box>
          </TabContext>
        </>
      );
    }
    case "Sales Engineer": {
      return (
        <>
          <h2 className="pagetitle">TLoans </h2>
          <TabContext value={value || "1"}>
            <Box sx={{ marginLeft: -3 }}>
              <Tabs
                selectionFollowsFocus={true}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#D97D54",
                  },
                }}
                sx={{
                  "& button:focus": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                  "& button:active": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                  "& button.Mui-selected": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                }}
                aria-label="basic tabs example"
                centered
              >
                <Tab
                  label="Current"
                  value="1"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="Pending"
                  value="2"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="Drafts"
                  value="3"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="History"
                  value="4"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
              </Tabs>
            </Box>

            <Box sx={{ marginTop: -5 }}>
              <TabPanel value="1">
                {LoansQuery.isLoading || LoansQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={LoansQuery.data.pages}
                      query={LoansQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="2">
                {PendingQuery.isLoading || PendingQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={PendingQuery.data.pages}
                      query={PendingQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="3">
                {DraftQuery.isLoading || DraftQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={DraftQuery.data.pages}
                      query={DraftQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="4">
                {HistoryQuery.isLoading || HistoryQuery.isError ? (
                  <>
                    <EmptyTable headers={headers} />
                  </>
                ) : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={HistoryQuery.data.pages}
                      query={HistoryQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
            </Box>
          </TabContext>
        </>
      );
    }
    case "Technical Staff": {
      return (
        <>
          <h2 className="pagetitle">TLoans </h2>
          <TabContext value={value || "1"}>
            <Box sx={{ marginLeft: -3 }}>
              <Tabs
                selectionFollowsFocus={true}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#D97D54",
                  },
                }}
                sx={{
                  "& button:focus": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                  "& button:active": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                  "& button.Mui-selected": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                }}
                aria-label="basic tabs example"
                centered
              >
                <Tab
                  label="Current"
                  value="1"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="Pending"
                  value="2"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="Drafts"
                  value="3"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="History"
                  value="4"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
              </Tabs>
            </Box>

            <Box sx={{ marginTop: -5 }}>
              <TabPanel value="1">
                {LoansQuery.isLoading || LoansQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={LoansQuery.data.pages}
                      query={LoansQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="2">
                {PendingQuery.isLoading || PendingQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={PendingQuery.data.pages}
                      query={PendingQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="3">
                {DraftQuery.isLoading || DraftQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={DraftQuery.data.pages}
                      query={DraftQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="4">
                {HistoryQuery.isLoading || HistoryQuery.isError ? (
                  <>
                    <EmptyTable headers={headers} />
                  </>
                ) : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={HistoryQuery.data.pages}
                      query={HistoryQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
            </Box>
          </TabContext>
        </>
      );
    }
    case "Sales Manager": {
      return (
        <>
          <h2 className="pagetitle">TLoans </h2>
          <TabContext value={value || "1"}>
            <Box sx={{ marginLeft: -3 }}>
              <Tabs
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#D97D54",
                  },
                }}
                sx={{
                  "& button:focus": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 65,
                  },
                  "& button:active": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 65,
                  },
                  "& button.Mui-selected": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 65,
                  },
                  paddingRight: 50,
                }}
                aria-label="basic tabs example"
                centered
              >
                <Tab
                  label="Loan"
                  value="1"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 60,
                    width: 180,
                  }}
                />
                <Tab
                  label="Extension"
                  value="2"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 60,
                    width: 180,
                  }}
                />
              </Tabs>
            </Box>

            <Box sx={{ marginTop: -5 }}>
              <TabPanel value="1">
                {LoansQuery.isLoading || LoansQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={LoansQuery.data.pages}
                      query={LoansQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="2">
                {PendingQuery.isLoading || PendingQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={PendingQuery.data.pages}
                      query={PendingQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
            </Box>
          </TabContext>
        </>
      );
    }
    case "Warehouse Worker": {
      return (
        <>
          <h2 className="pagetitle">TLoans </h2>
          <TabContext value={value || "1"}>
            <Box sx={{ marginLeft: -3 }}>
              <Tabs
                selectionFollowsFocus={true}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#D97D54",
                  },
                }}
                sx={{
                  "& button:focus": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                  "& button:active": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                  "& button.Mui-selected": {
                    backgroundColor: "#063970",
                    color: "white",
                    width: 190,
                    height: 110,
                  },
                }}
                aria-label="basic tabs example"
                centered
              >
                <Tab
                  label="Current"
                  value="1"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="Pending"
                  value="2"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="Drafts"
                  value="3"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
                <Tab
                  label="History"
                  value="4"
                  sx={{
                    color: "grey",
                    backgroundColor: "White",
                    borderRadius: 2,
                    marginRight: 2,
                    height: 100,
                    width: 180,
                  }}
                />
              </Tabs>
            </Box>

            <Box sx={{ marginTop: -5 }}>
              <TabPanel value="1">
                {LoansQuery.isLoading || LoansQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={LoansQuery.data.pages}
                      query={LoansQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="2">
                {PendingQuery.isLoading || PendingQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={PendingQuery.data.pages}
                      query={PendingQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="3">
                {DraftQuery.isLoading || DraftQuery.isError ? null : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={DraftQuery.data.pages}
                      query={DraftQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel value="4">
                {HistoryQuery.isLoading || HistoryQuery.isError ? (
                  <>
                    <EmptyTable headers={headers} />
                  </>
                ) : (
                  <>
                    <TableNew
                      headers={headers}
                      pages={HistoryQuery.data.pages}
                      query={HistoryQuery}
                      menu={ActionMenu}
                    />
                  </>
                )}
              </TabPanel>
            </Box>
          </TabContext>
        </>
      );
    }
  }
};

export default TLoanTabs;
