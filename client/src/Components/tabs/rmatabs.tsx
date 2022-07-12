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
import { Link, useNavigate } from 'react-router-dom'
import SubmitButton from '../form/SubmitButton';
import ActionMenu from "../../components/table/ActionMenu";

export default function RMATabs() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [received, setReceived] = useState([]);
  const [verified, setVerified] = useState([]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const pending = await axios.get('http://localhost:5000/api/pendingRMA');
      const approved = await axios.get('http://localhost:5000/api/approvedRMA');
      const received = await axios.get('http://localhost:5000/api/receivedRMA');
      const verified = await axios.get('http://localhost:5000/api/verifiedRMA');

      setPending(pending.data)
      setApproved(approved.data)
      setReceived(received.data)
      setVerified(verified.data)
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [])

    const columnName =[ 
      "RMA No.",
      "DateTime",
      "Company Name",
      "Customer Email",
      "Actions"
    ]

    // const RMAsQuery = useInfiniteQuery('RMAs', pending,
    // {
    //   getNextPageParam: (lastPage, pages) => {
    //     if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
    //     return undefined;
    //   }
    // });

  const getPending = () => {
    let html = []
        html.push(
            <div className='container'>
                
                   
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
                            <div >{pending.length > 0
                              ? pending.map((rma => {
                                  const {RMANo, DateTime, Company, CustomerEmail} = rma
                                return(
                                <div>
                              <TableRow  key={RMANo} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell sx={{ color: "#0A2540" }} align="left">
                                            {RMANo}
                                </TableCell>
                                <TableCell sx={{ color: "#0A2540" }} align="left">
                                            {DateTime}
                                </TableCell>
                                <TableCell sx={{ color: "#0A2540" }} align="left">
                                            {RMANo}
                                </TableCell>
                                <TableCell sx={{ color: "#0A2540" }} align="left">
                                            {Company}
                                </TableCell>
                                <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {CustomerEmail}
                                </TableCell>
                                <ActionMenu id={RMANo} />
                                </TableRow>
                            </div>
                              )}))
                              
                              : "Loading..." }</div> 
                              
                          </TableBody>
                        </Table>
                      
                      </TableContainer>
                    
                                {/* 
                                <div>
                                 <Link to={"/RMADetails/" + rma.RMANo}>View More</Link>
                                </div>                 */}
                            </div>                            
                    
            </div>
        )
    return html
}
const getApproved = () => {
  let html = []
      html.push(
          <div className='container'>
              
                 
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
                          <div >{approved.length > 0
                            ? approved.map((rma => {
                                const {RMANo} = rma
                              return(
                              <div>
                            <TableRow  key={RMANo} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                        {RMANo}
                              </TableCell>
                              <ActionMenu id={RMANo} />

                              </TableRow>
                          
                          </div>
                            )}))
                            
                            : "Loading..." }</div> 
                            
                        </TableBody>
                      </Table>
                    
                    </TableContainer>
                  
                              {/* 
                              <div>
                               <Link to={"/RMADetails/" + rma.RMANo}>View More</Link>
                              </div>                 */}
                          </div>                            
                  
          </div>
      )
  return html
}

const getReceived = () => {
  let html = []
      html.push(
          <div className='container'>
              
                 
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
                          <div >{received.length > 0
                            ? received.map((rma => {
                                const {RMANo} = rma
                              return(
                              <div>
                            <TableRow  key={RMANo} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                        {RMANo}
                              </TableCell>
                              <ActionMenu id={RMANo} />

                              </TableRow>
                          
                          </div>
                            )}))
                            
                            : "Loading..." }</div> 
                            
                        </TableBody>
                      </Table>
                    
                    </TableContainer>
                  
                              {/* 
                              <div>
                               <Link to={"/RMADetails/" + rma.RMANo}>View More</Link>
                              </div>                 */}
                          </div>                            
                  
          </div>
      )
  return html
}

const getVerified = () => {
  let html = []
      html.push(
          <div className='container'>
              
                 
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
                          <div >{verified.length > 0
                            ? verified.map((rma => {
                                const {RMANo} = rma
                              return(
                              <div>
                            <TableRow  key={RMANo} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                          {RMANo}
                              </TableCell>
                              <TableCell sx={{ color: "#0A2540" }} align="left">
                                        {RMANo}
                              </TableCell>
                              <ActionMenu id={RMANo} />

                              </TableRow>
                          
                          </div>
                            )}))
                            
                            : "Loading..." }</div> 
                            
                        </TableBody>
                      </Table>
                    
                    </TableContainer>
                  
                              {/* 
                              <div>
                               <Link to={"/RMADetails/" + rma.RMANo}>View More</Link>
                              </div>                 */}
                          </div>                            
                  
          </div>
      )
  return html
}

const applyLoan = () => {
  let navigate = useNavigate();

  async function apply(event) {
    event.preventDefault();
    await SubmitButton(event.target);
    navigate("/createRMA", { replace: true });
}
return   (
<button onClick={apply}>
Apply new RMA
</button>
)
}

return(
  <div>
    <Tabs>
        <TabList>
        <Tab>Pending</Tab>
        <Tab>Approved</Tab>
        <Tab>Received </Tab>
        <Tab>Verified</Tab>
        </TabList>

        <TabPanel>
        <div key="pending">
          {getPending()}
        </div>
        </TabPanel>
        <TabPanel>
        <div key="approved">
          {getApproved()}
        </div>
        </TabPanel>
        <TabPanel>
        <div key="verified">
          {getReceived()}
        </div>
        </TabPanel>
        <TabPanel>
        <div key="verified">
          {getVerified()}
        </div>
        </TabPanel>

       
    </Tabs>

    {applyLoan()}
    </div>
  
)
};