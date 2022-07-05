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
  
      const [draft, setDraft] = useState([]);
      const [newDraft, setNewDraft] = useState([]);
      const [group, setGroup] = useState([])

      useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          // get the data from the api
          const draft = await axios.get('http://localhost:5000/api/tloan/pending');
         
          setDraft(draft.data)
          console.log(draft.data)
        
        }
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);;
      }, [])

     
    
      useEffect(()=> {

       
          let newDraft = draft
          setNewDraft(newDraft)
        
      },[draft])

    
     
      const getData = () => {
        let data = {...newDraft}
        let html = []

        for(const [key, value] of Object.entries(data)) {
            html.push(
                <div className='container'>
                    <div key="draftObject" >{key && value && value.length > 0
                    ? value.map(drafts => {
                        const { TLoanID, TLoanNumber, RequiredDate} =drafts
                        return (
                                   <TableBody key="tbody">
                                      <TableRow key="trow2" >
                                      
                                          <TableCell align="center" key="cell1">{TLoanNumber}</TableCell>
                                          {/* <TableCell align="center">{RequiredDate}</TableCell>
                                          <TableCell align="center"></TableCell>
                                          <TableCell align="center"></TableCell>
                                          <TableCell align="center"></TableCell>
                                          <TableCell align="center"></TableCell> */}
                                          
                                        </TableRow>
                                    
                                    </TableBody>    
                               
                            
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

            <TabPanel key="cwehie">
            
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }} aria-label="simple table">
        <TableHead key="thead">
          <TableRow key="trow">
            <TableCell align="center">Loan No.</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">Company Name</TableCell>
            <TableCell align="center">Customer Email</TableCell>
            <TableCell align="center">Actions</TableCell>
            
          </TableRow>
        </TableHead>
           
              {getData()}
          
        
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