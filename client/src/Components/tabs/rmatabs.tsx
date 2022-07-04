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


export default function RMATabs() {
  
      const [rma, setRma] = useState([]);
      const [newRma, setNewRma] = useState([]);

      useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          // get the data from the api
          const rma = await axios.get('http://localhost:5000/api/RMA');
         
          setRma(rma.data)
          console.log(rma.data)
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);;
      }, [])

      useEffect(() => {

        const newRma =rma.map(
            ({ }) => ({
               
            })
        )
        setNewRma(newRma)

    }, [rma])

   
   return(
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