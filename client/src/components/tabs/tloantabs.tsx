import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function TLoanTabs() {
  
      const [loan, setLoan] = useState([]);
      const [newLoan, setNewLoan] = useState([]);

      useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          // get the data from the api
          const loan = await axios.get('https://localhost:5000/api/allLoan');
         
          setLoan(loan.data)
          console.log(setLoan)
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);;
      }, [])

      useEffect(() => {

        const newLoan =loan.map(
            ({ }) => ({
               
            })
        )
        setNewLoan(newLoan)

    }, [loan])

   
   return(
        <Tabs>
            <TabList>
            <Tab>Current</Tab>
            <Tab>Pending</Tab>
            <Tab>Draft </Tab>
            <Tab>History</Tab>
            </TabList>

            <TabPanel>
            <TableContainer component={Paper}>
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
              <TableCell component="th" scope="row" align="center" hidden>
               
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              
            </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer>

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
   )
};