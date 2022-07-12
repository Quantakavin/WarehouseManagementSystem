import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "react-query";
import SubmitButton from "../form/SubmitButton";

import ActionMenu from "../table/ActionMenu";

const TLoanTabs: React.FC = () => {
  const [current, setCurrent] = useState([]);
  const [pending, setPending] = useState([]);
  const [draft, setDraft] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const current = await axios.get(
        "http://localhost:5000/api/tloan/current"
      );
      const pending = await axios.get(
        "http://localhost:5000/api/tloan/current"
      );
      const draft = await axios.get("http://localhost:5000/api/tloan/current");
      const history = await axios.get(
        "http://localhost:5000/api/tloan/current"
      );

      setCurrent(current.data);
      setPending(pending.data);
      setDraft(draft.data);
      setHistory(history.data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const columnName = [
    "Loan No.",
    "Start Date",
    "End Date",
    "Company Name",
    "Customer Email",
    "Actions",
  ];

  // const LoansQuery = useInfiniteQuery('loans', current,
  // {
  //   getNextPageParam: (lastPage, pages) => {
  //     if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
  //     return undefined;
  //   }
  // });

  const getCurrent = () => {
    const html = [];
    html.push(
      <div className="container">
        <div className="" key="id">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columnName.map((col) => (
                    <TableCell
                      sx={{ color: "#86898E", fontWeight: 500 }}
                      className="tableheader"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <div>
                  {current.length > 0
                    ? current.map((loans) => {
                        const { TLoanNumber } = loans;
                        return (
                          <div>
                            <TableRow
                              key={TLoanNumber}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                {TLoanNumber}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                {TLoanNumber}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                {TLoanNumber}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                {TLoanNumber}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                {TLoanNumber}
                              </TableCell>
                              <ActionMenu id={TLoanNumber} />
                            </TableRow>
                          </div>
                        );
                      })
                    : "Loading..."}
                </div>
              </TableBody>
            </Table>
          </TableContainer>

          {/* 
                                    <div>
                                     <Link to={"/tloanDetails/" + loans.TLoanNumber}>View More</Link>
                                    </div>                 */}
        </div>
      </div>
    );
    return html;
  };

  const applyLoan = () => {
    const navigate = useNavigate();

    async function apply(event) {
      event.preventDefault();
      await SubmitButton(event.target);
      navigate("/newtloan", { replace: true });
    }
    return <button onClick={apply}>Apply new TLoan</button>;
  };

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Current</Tab>
          <Tab>Pending</Tab>
          <Tab>Draft </Tab>
          <Tab>History</Tab>
        </TabList>

        <TabPanel>
          <div key="current">{getCurrent()}</div>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>

      {applyLoan()}
    </div>
  );
};

export default TLoanTabs;
