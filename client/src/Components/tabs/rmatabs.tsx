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
import { useAppSelector } from "../../app/hooks";
import { Link } from 'react-router-dom'


export default function RMATabs() {
  const role = useAppSelector((state) => state.currentUser.role);
  const [rma, setRma] = useState([]);
  const [newRma, setNewRma] = useState([]);
  const [group, setGroup] = useState([])

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const appliedrma = await axios.get("http://localhost:5000/api/pendingRMA");
      const approvedrma = await axios.get("http://localhost:5000/api/acceptedRMA");
      const receivedrma = await axios.get("http://localhost:5000/api/receivedRMA");
      const verifiedrma = await axios.get("http://localhost:5000/api/verifiedRMA");

      setRma(appliedrma.data);
      // console.log(rma.data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  useEffect(() => {
    const newRma = rma
    setNewRma(newRma);
  }, [rma]);

  useEffect( () => {
    let group = newRma.reduce((r, a) => {
        r[a.RmaStatusID] = [...r[a.RmaStatusID] || [], a];
        return r
    }, {})

    setGroup(group)
    console.log(group)

}, [newRma])
 
  const getData = () => {
    let data = {...group}
    let html = []

    for(const [key, value] of Object.entries(data)) {
        html.push(
            <div className='container'>
                <div >{key && value && value.length > 0
                ? value.map(rma => {
                    const { RMANo, DateTime, RmaStatusID} = rma
                    return (
                        <div className="" key={RmaStatusID}>
                                <div>
                                    <strong>{RMANo}</strong>
                                </div>
                                <div className=''>
                                    <strong>{DateTime}</strong>  
                                </div>

                                <div>
                                 <Link to={"/RMADetails/" + rma.RMANo}>View More</Link>
                                </div>

                              
                            </div>
                        
                    )
                })
                : "Loading..."}</div>
            </div>
        )
    }

    return html
}

  switch (role) {
    case "Admin":
      return (
        <Tabs>
          <TabList>
            <Tab>Applied</Tab>
            <Tab>Approved</Tab>
            <Tab>Received </Tab>
            <Tab>Verified</Tab>
          </TabList>

          
          <TabPanel>
            
            {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Loan No.</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">Company Name</TableCell>
            <TableCell align="center">Customer Email</TableCell>
            <TableCell align="center">Actions</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
          
              <TableCell align="center">{getData}</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              
            </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer> */}
            <div key="applied">
              {getData()}
            </div>
     
            </TabPanel>
          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Tabs>
      );
    case "Sales Manager":
      return (
        <Tabs>
          <TabList>
            <Tab>Applied</Tab>
            <Tab>Approved</Tab>
            <Tab>Received </Tab>
            <Tab>Verified</Tab>
          </TabList>

          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Tabs>
      );
    case "Sales Engineer":
      return (
        <Tabs>
          <TabList>
            <Tab>Applied</Tab>
          </TabList>

          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Tabs>
      );
    case "Warehouse Worker":
      return (
        <Tabs>
          <TabList>
            <Tab>Approved</Tab>
          </TabList>

          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Tabs>
      );
    case "Technical Staff":
      return (
        <Tabs>
          <TabList>
            <Tab>Received </Tab>
          </TabList>

          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Tabs>
      );
    case "Sales Admin":
      return (
        <Tabs>
          <TabList>
            <Tab>Verified</Tab>
          </TabList>

          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Tabs>
      );
    default:
      return (
        <Tabs>
          <TabList>
            <Tab>Applied</Tab>
            <Tab>Approved</Tab>
            <Tab>Received </Tab>
            <Tab>Verified</Tab>
          </TabList>

          <TabPanel>
            
            {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Loan No.</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">Company Name</TableCell>
            <TableCell align="center">Customer Email</TableCell>
            <TableCell align="center">Actions</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
          
              <TableCell align="center">{getData}</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              
            </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer> */}
            <div key="applied">
              {getData()}
            </div>
     
            </TabPanel>
          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">RMA No.</TableCell>
                    <TableCell align="center">Date Applied</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      hidden
                    />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Tabs>
      );
  }
}
