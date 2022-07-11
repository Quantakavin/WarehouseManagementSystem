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
import { Link } from 'react-router-dom'


export default function TLoanTabs() {
  
      const [loan, setLoan] = useState([]);
      const [newLoan, setNewLoan] = useState([]);
      const [group, setGroup] = useState([])

      useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          // get the data from the api
          const loan = await axios.get('http://localhost:5000/api/tloan');
         
          setLoan(loan.data)
          console.log(loan.data)
        
        }
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);;
      }, [])

     
    
      useEffect(()=> {

       
          let newLoan = loan
          setNewLoan(newLoan)
        
      },[loan])

      useEffect( () => {
        let group = newLoan.reduce((r, a) => {
            r[a.TLoanStatusID] = [...r[a.TLoanStatusID] || [], a];
            return r
        }, {})

        setGroup(group)
        console.log(group)

    }, [newLoan])
     
      const getData = () => {
        let data = {...group}
        let html = []

        for(const [key, value] of Object.entries(data)) {
            html.push(
                <div className='container'>
                    <div >{key && value && value.length > 0
                    ? value.map(loans => {
                        const { TLoanNumber, RequiredDate} = loans
                        return (
                            <div className="" key={TLoanNumber}>
                                    <div>
                                        <strong>{TLoanNumber}</strong>
                                    </div>
                                    <div className=''>
                                        <strong>{RequiredDate}</strong>  
                                    </div>

                                    <div>
                                     <Link to={"/tloanDetails/" + loans.TLoanNumber}>View More</Link>
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
    

   
   return(
      
        <Tabs>
            <TabList>
            <Tab>Current</Tab>
            <Tab>Pending</Tab>
            <Tab>Draft </Tab>
            <Tab>History</Tab>
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
            <div key="current">
              {getData()}
            </div>
     
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