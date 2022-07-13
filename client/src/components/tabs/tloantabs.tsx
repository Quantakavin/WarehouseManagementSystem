import { Tab, Tabs, Box } from '@mui/material';
import {TabList, TabPanel, TabContext } from '@mui/lab'; 
import 'react-tabs/style/react-tabs.css';
import React , { useEffect, useState } from 'react';
// import axios from 'axios';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom'
import SubmitButton from '../form/SubmitButton';
import { useQuery, useInfiniteQuery } from "react-query";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PageviewIcon from '@mui/icons-material/Pageview';
import ActionMenu from "../../components/table/ActionMenu";
import { GetCurrent, GetDraft, GetPending, GetHistory } from '../../api/TLoanDB';
import TableNew from "../../components/table/TableNew";

// const TLoanTabs : React.FC = () => {


  
//       const [current, setCurrent] = useState([]);
//       const [pending, setPending] = useState([]);
//       const [draft, setDraft] = useState([]);
//       const [history, setHistory] = useState([]);

//       useEffect(() => {
//         // declare the async data fetching function
//         const fetchData = async () => {
//           // get the data from the api
//           const current = await axios.get('http://localhost:5000/api/tloan/current');
//           const pending = await axios.get('http://localhost:5000/api/tloan/current');
//           const draft = await axios.get('http://localhost:5000/api/tloan/current');
//           const history= await axios.get('http://localhost:5000/api/tloan/current');

         
//           setCurrent(current.data)
//           setPending(pending.data)
//           setDraft(draft.data)
//           setHistory(history.data)
          
        
//         }
//         // call the function
//         fetchData()
//           // make sure to catch any error
//           .catch(console.error);;
//       }, [])

//         const columnName =[ 
//           "Loan No.",
//           "Start Date",
//           "End Date",
//           "Company Name",
//           "Customer Email",
//           "Actions"

//         ]

//         const ActionMenu = (id: string) => {
//           return (
//             [
//               {
//                 name: "View Details",
//                 url: `/user/${id}`,
//                 icon: <PageviewIcon fontSize="small" />,
//                 delete: false
//               },
//               {
//                 name: "Edit Details",
//                 url: `/edituser/${id}`,
//                 icon: <ModeEditOutlineIcon fontSize="small" />,
//                 delete: false
//               },
//               {
//                 name: "Delete",
//                 icon: <DeleteOutlineIcon fontSize="small" />,
//                 delete: true
//               },
//             ]
//           )
//         }
      

//         // const LoansQuery = useInfiniteQuery('loans', current,
//         // {
//         //   getNextPageParam: (lastPage, pages) => {
//         //     if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
//         //     return undefined;
//         //   }
//         // });
    
//       const getCurrent = () => {
//         let html = []
//             html.push(
//                 <div className='container'>
                    
                       
//                           <div className="" key="id">
//                             <TableContainer component={Paper}>
//                             <Table aria-label="simple table">
//                               <TableHead>
//                                 <TableRow>
//                                   {columnName.map((col) => (
//                                     <TableCell
//                                       sx={{ color: "#86898E", fontWeight: 500 }}
//                                       className="tableheader"
//                                     >
//                                       {col}
//                                     </TableCell>
//                                   ))}
//                                 </TableRow>
//                               </TableHead>
//                               <TableBody>
//                                 <div >{current.length > 0
//                                   ? current.map((loans => {
//                                       const {TLoanNumber} = loans
//                                     return(
//                                     <div>
//                                   <TableRow  key={TLoanNumber} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
//                                     <TableCell sx={{ color: "#0A2540" }} align="left">
//                                                 {TLoanNumber}
//                                     </TableCell>
//                                     <TableCell sx={{ color: "#0A2540" }} align="left">
//                                                 {TLoanNumber}
//                                     </TableCell>
//                                     <TableCell sx={{ color: "#0A2540" }} align="left">
//                                                 {TLoanNumber}
//                                     </TableCell>
//                                     <TableCell sx={{ color: "#0A2540" }} align="left">
//                                                 {TLoanNumber}
//                                     </TableCell>
//                                     <TableCell sx={{ color: "#0A2540" }} align="left">
//                                               {TLoanNumber}
//                                     </TableCell>
//                                     <ActionMenu id={TLoanNumber} />

//                                     </TableRow>
                                
//                                 </div>
//                                   )}))
                                  
//                                   : "Loading..." }</div> 
                                  
//                               </TableBody>
//                             </Table>
                          
//                           </TableContainer>
                        
//                                     {/* 
//                                     <div>
//                                      <Link to={"/tloanDetails/" + loans.TLoanNumber}>View More</Link>
//                                     </div>                 */}
//                                 </div>                            
                        
//                 </div>
//             )
//         return html
//     }
    
//     const applyLoan = () => {
//       let navigate = useNavigate();

//       async function apply(event) {
//         event.preventDefault();
//         await SubmitButton(event.target);
//         navigate("/newtloan", { replace: true });
//     }
//     return   (
//     <button onClick={apply}>
//     Apply new TLoan
//     </button>
//     )
//   }
   
//    return(
//       <div>
//         <Tabs>
//             <TabList>
//             <Tab>Current</Tab>
//             <Tab>Pending</Tab>
//             <Tab>Draft </Tab>
//             <Tab>History</Tab>
//             </TabList>

//             <TabPanel>
            
            
//             <div key="current">
//               {getCurrent()}
//             </div>
     
//             </TabPanel>
//             <TabPanel>
//             <h2>Any content 2</h2>
//             </TabPanel>
//             <TabPanel>
//             <h2>Any content 2</h2>
//             </TabPanel>
//             <TabPanel>
//             <h2>Any content 2</h2>
//             </TabPanel>

           
//         </Tabs>
    
//         {applyLoan()}
//         </div>
      
//    )
// };

// export default TLoanTabs



const TLoanTabs: React.FC = () => {
  
    
  const headers = [
    "Loan No.",
    "Start Date",
    "End Date",
    "Company Name",
    "Customer Email",
    "Actions"
  ];
  const LoansQuery = useInfiniteQuery(`loans`, GetCurrent,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const PendingQuery = useInfiniteQuery(`pending`, GetPending,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const DraftQuery = useInfiniteQuery(`draft`, GetDraft,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const HistoryQuery = useInfiniteQuery(`history`, GetHistory,
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
          url: `/tloan/${id}`,
          icon: <PageviewIcon fontSize="small" />,
          delete: false
        },
        {
          name: "Edit Details",
          url: `/tloan/edit/${id}`,
          icon: <ModeEditOutlineIcon fontSize="small" />,
          delete: false
        },
        // {
        //   name: "Delete",
        //   icon: <DeleteOutlineIcon fontSize="small" />,
        //   delete: true
        // },
      ]
    )
  }
  const [value, setValue] = useState(0); // first tab

  const handleChange = (_event, newValue) => {
   setValue(newValue);
  };

  return (
    <>
      <h2 className="pagetitle">TLoans </h2>
     <TabContext value={value}>
     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList onChange={handleChange}>
        <Tab label="Current" value="1"/>
        <Tab label="Pending" value="2"/>
        <Tab label="Drafts" value="3"/>
        <Tab label="History" value="4"/>
      </TabList>
      </Box>
      

       <TabPanel value="1">
      {LoansQuery.isLoading || LoansQuery.isError ? null :
      <>
        <TableNew headers={headers} pages={LoansQuery.data.pages} query={LoansQuery} menu={ActionMenu} />
        </>
      }
      </TabPanel>
      <TabPanel value="2">
      {PendingQuery.isLoading || PendingQuery.isError ? null :
      <>
        <TableNew headers={headers} pages={PendingQuery.data.pages} query={PendingQuery} menu={ActionMenu} />
        </>
      }
      </TabPanel>
      <TabPanel value="3">
      {DraftQuery.isLoading || DraftQuery.isError ? null :
      <>
        <TableNew headers={headers} pages={DraftQuery.data.pages} query={DraftQuery} menu={ActionMenu} />
        </>
      }
      </TabPanel>
      <TabPanel value="4">
      {HistoryQuery.isLoading || HistoryQuery.isError ? <><div className=''>No Loans bruh</div></> :
      <>
        <TableNew headers={headers} pages={HistoryQuery.data.pages} query={HistoryQuery} menu={ActionMenu} />
        </>
      } 
      </TabPanel>
      
      </TabContext>
    </>
  )

};
export default TLoanTabs