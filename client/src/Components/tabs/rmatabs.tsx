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
import ActionMenu from "../table/ActionMenu";
import { GetPendingRMA, GetApprovedRMA, 
    GetReceivedRMA, GetVerifiedRMA,
    GetSalesmanAcceptedRMA, GetSalesmanRejectedRMA, 
    GetIPRMA, GetClosedRMA, GetRMAByRmaID
   } from "../../api/RmaDB";
import TableNew from "../table/TableNew";
import { useAppSelector } from '../../app/hooks'
import { selectRole, selectId } from '../../app/reducers/CurrentUserSlice';
import RmaSearch from "../search/RmaSearch"

const Rmatabs: React.FC = () => {
  const headers = [
    "RMA No.",
    "DateTime",
    "Company Name",
    "Customer Email",
    "Actions"
  ];
  const userrole = useAppSelector(selectRole)
  const userid = useAppSelector(selectId)

  const PendingRMAQuery = useInfiniteQuery(`pending`, GetPendingRMA,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });
  
  const ApprovedRMAQuery = useInfiniteQuery(`approved`, GetApprovedRMA,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const ReceivedRMAQuery = useInfiniteQuery(`received`, GetReceivedRMA,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const VerifiedRMAQuery = useInfiniteQuery(`verified`, GetVerifiedRMA,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const InprogressRMAQuery = useInfiniteQuery(`inprogress`, GetIPRMA,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const ClosedRMAQuery = useInfiniteQuery(`closed`, GetClosedRMA,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const myAcceptedRMAQuery = useInfiniteQuery(`myAccepted`, GetSalesmanAcceptedRMA,
  {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    }
  });

  const myRejectedRMAQuery = useInfiniteQuery(`myRejected`, GetSalesmanRejectedRMA,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const applyLoan = () => {
      let navigate = useNavigate();
    
      async function apply(event) {
        event.preventDefault();
        await SubmitButton(event.target);
        navigate("/createRMA", { replace: true });
    }
  }

  const ActionMenu = (id: string) => {
    return (
      [
        {
          name: "View Details",
          url: `/rmaDetails/${id}`,
          icon: <PageviewIcon fontSize="small" />,
          delete: false
        },
        {
          name: "Edit Details",
          url: `/rmaDetails/edit/${id}`,
          icon: <ModeEditOutlineIcon fontSize="small" />,
          delete: false
        }
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

  switch (userrole) { 
    case "Sales Engineer": { 
        return(
            <>
            <h2 className="pagetitle">RMA requests </h2>
            <RmaSearch/>
           <TabContext value={value}>
           <Box sx={{ paddingLeft:10, marginTop: 3}}>
            <Tabs centered onChange={handleChange} TabIndicatorProps={{style: {backgroundColor: "#D97D54"}}} 
            sx={{"& button:focus": { backgroundColor: "#063970", color:"white", width: 190, height: 110}}}>
              <Tab label="Approved" value="1" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
              <Tab label="Rejected" value="2" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
              </Tabs>
          </Box>
          <Box sx={{marginTop:-5}}>
          <TabPanel value="1">
            {myAcceptedRMAQuery.isLoading || myAcceptedRMAQuery.isError ? null :
            <>
              <TableNew headers={headers} pages={myAcceptedRMAQuery.data.pages} query={myAcceptedRMAQuery} menu={ActionMenu} />
              </>
            }
            </TabPanel>
            <TabPanel value="2">
            {myRejectedRMAQuery.isLoading || myRejectedRMAQuery.isError ? null :
            <>
              <TableNew headers={headers} pages={myRejectedRMAQuery.data.pages} query={myRejectedRMAQuery} menu={ActionMenu} />
              </>
            }
            </TabPanel>
          </Box>
            </TabContext>
          </>
          )
    } 
  case "Technical Staff": { 
        return(
            <>
            <h2 className="pagetitle">RMA requests </h2>
            <RmaSearch/>
        <TabContext value={value}>
        <Box sx={{ paddingLeft:10, marginTop: 3}}>
        <Tabs centered onChange={handleChange} TabIndicatorProps={{style: {backgroundColor: "#D97D54"}}} 
        sx={{"& button:focus": { backgroundColor: "#063970", color:"white", width: 190, height: 110}}}>
            <Tab label="Received" value="3" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
        </Tabs>
      </Box>
      <Box sx={{marginTop:-5}}>
      <TabPanel value="3">
            {ReceivedRMAQuery.isLoading || ReceivedRMAQuery.isError ? null :
            <>
            <TableNew headers={headers} pages={ReceivedRMAQuery.data.pages} query={ReceivedRMAQuery} menu={ActionMenu} />
            </>
            }
            </TabPanel>
      </Box>
            </TabContext>
        </>
        )
    } 
    case "Sales Manager": { 
      return(
        <>
        <h2 className="pagetitle">RMA requests </h2>
        <RmaSearch/>
       <TabContext value={value}>
       <Box sx={{ paddingLeft:10, marginTop: 3}}>
        <Tabs centered onChange={handleChange} TabIndicatorProps={{style: {backgroundColor: "#D97D54"}}} 
        sx={{"& button:focus": { backgroundColor: "#063970", color:"white", width: 190, height: 110}}}>
            <Tab label="Pending" value="1" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            <Tab label="Approved" value="2" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            <Tab label="Received" value="3" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            <Tab label="Verified" value="4" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            <Tab label="In Progress" value="5" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            <Tab label="Closed" value="6" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
        </Tabs>
      </Box>
        
  <Box sx={{marginTop:-5}}>
         <TabPanel value="1">
        {PendingRMAQuery.isLoading || PendingRMAQuery.isError ? null :
        <>
          <TableNew headers={headers} pages={PendingRMAQuery.data.pages} query={PendingRMAQuery} menu={ActionMenu} />
          </>
        }
        </TabPanel>
        <TabPanel value="2">
        {ApprovedRMAQuery.isLoading || ApprovedRMAQuery.isError ? null :
        <>
          <TableNew headers={headers} pages={ApprovedRMAQuery.data.pages} query={ApprovedRMAQuery} menu={ActionMenu} />
          </>
        }
        </TabPanel>
        <TabPanel value="3">
        {ReceivedRMAQuery.isLoading || ReceivedRMAQuery.isError ? null :
        <>
          <TableNew headers={headers} pages={ReceivedRMAQuery.data.pages} query={ReceivedRMAQuery} menu={ActionMenu} />
          </>
        }
        </TabPanel>
        <TabPanel value="4">
        {VerifiedRMAQuery.isLoading || VerifiedRMAQuery.isError ? <><div className=''>No RMA requests</div></> :
        <>
          <TableNew headers={headers} pages={VerifiedRMAQuery.data.pages} query={VerifiedRMAQuery} menu={ActionMenu} />
          </>
        } 
        </TabPanel>
        <TabPanel value="5">
        {InprogressRMAQuery.isLoading || InprogressRMAQuery.isError ? <><div className=''>No RMA requests</div></> :
        <>
          <TableNew headers={headers} pages={InprogressRMAQuery.data.pages} query={InprogressRMAQuery} menu={ActionMenu} />
          </>
        } 
        </TabPanel>
        <TabPanel value="6">
        {ClosedRMAQuery.isLoading || ClosedRMAQuery.isError ? <><div className=''>No RMA requests</div></> :
        <>
          <TableNew headers={headers} pages={ClosedRMAQuery.data.pages} query={ClosedRMAQuery} menu={ActionMenu} />
          </>
        } 
        </TabPanel>
  </Box>
        
        </TabContext>
      </>
      )
    } 
    case "Sales Admin": { 
        return(
            <>
            <h2 className="pagetitle">RMA requests </h2>
            <RmaSearch/>
           <TabContext value={value}>
           <Box sx={{ paddingLeft:10, marginTop: 3}}>
        <Tabs centered onChange={handleChange} TabIndicatorProps={{style: {backgroundColor: "#D97D54"}}} 
        sx={{"& button:focus": { backgroundColor: "#063970", color:"white", width: 190, height: 110}}}>
            <Tab label="Verified" value="4" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            <Tab label="In Progress" value="5" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
        </Tabs>
      </Box>
      <Box sx={{marginTop:-5}}>
      <TabPanel value="4">
            {VerifiedRMAQuery.isLoading || VerifiedRMAQuery.isError ? <><div className=''>No RMA requests</div></> :
            <>
              <TableNew headers={headers} pages={VerifiedRMAQuery.data.pages} query={VerifiedRMAQuery} menu={ActionMenu} />
              </>
            } 
            </TabPanel>
      <TabPanel value="5">
            {InprogressRMAQuery.isLoading || InprogressRMAQuery.isError ? <><div className=''>No RMA requests</div></> :
            <>
              <TableNew headers={headers} pages={InprogressRMAQuery.data.pages} query={InprogressRMAQuery} menu={ActionMenu} />
              </>
            } 
            </TabPanel>
      </Box>

            </TabContext>
          </>
          )
    } 
    case "Warehouse Worker": { 
        return(
            <>
            <h2 className="pagetitle">RMA requests </h2>
            <RmaSearch/>
           <TabContext value={value}>
           <Box sx={{ paddingLeft:10, marginTop: 3}}>
        <Tabs centered onChange={handleChange} TabIndicatorProps={{style: {backgroundColor: "#D97D54"}}} 
        sx={{"& button:focus": { backgroundColor: "#063970", color:"white", width: 190, height: 110}}}>
            <Tab label="Received" value="3" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
        </Tabs>
      </Box>
      <Box sx={{marginTop:-5}}>
            <TabPanel value="3">
            {ReceivedRMAQuery.isLoading || ReceivedRMAQuery.isError ? null :
            <>
              <TableNew headers={headers} pages={ReceivedRMAQuery.data.pages} query={ReceivedRMAQuery} menu={ActionMenu} />
              </>
            }
            </TabPanel>
            </Box>
            </TabContext>
          </>
          )
    } 
    case "Admin": { 
        return(
            <>
            <h2 className="pagetitle">RMA requests </h2>
            <RmaSearch/>
           <TabContext value={value}>
           <Box sx={{ paddingLeft:10, marginTop: 3}}>
            <Tabs centered onChange={handleChange} TabIndicatorProps={{style: {backgroundColor: "#D97D54"}}} 
            sx={{"& button:focus": { backgroundColor: "#063970", color:"white", width: 190, height: 110}}}>
                <Tab label="Pending" value="1" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
                <Tab label="Approved" value="2" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
                <Tab label="Received" value="3" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
                <Tab label="Verified" value="4" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
                <Tab label="In Progress" value="5" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
                <Tab label="Closed" value="6" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            </Tabs>
          </Box>
            
      <Box sx={{marginTop:-5}}>
             <TabPanel value="1">
            {PendingRMAQuery.isLoading || PendingRMAQuery.isError ? null :
            <>
              <TableNew headers={headers} pages={PendingRMAQuery.data.pages} query={PendingRMAQuery} menu={ActionMenu} />
              </>
            }
            </TabPanel>
            <TabPanel value="2">
            {ApprovedRMAQuery.isLoading || ApprovedRMAQuery.isError ? null :
            <>
              <TableNew headers={headers} pages={ApprovedRMAQuery.data.pages} query={ApprovedRMAQuery} menu={ActionMenu} />
              </>
            }
            </TabPanel>
            <TabPanel value="3">
            {ReceivedRMAQuery.isLoading || ReceivedRMAQuery.isError ? null :
            <>
              <TableNew headers={headers} pages={ReceivedRMAQuery.data.pages} query={ReceivedRMAQuery} menu={ActionMenu} />
              </>
            }
            </TabPanel>
            <TabPanel value="4">
            {VerifiedRMAQuery.isLoading || VerifiedRMAQuery.isError ? <><div className=''>No RMA requests</div></> :
            <>
              <TableNew headers={headers} pages={VerifiedRMAQuery.data.pages} query={VerifiedRMAQuery} menu={ActionMenu} />
              </>
            } 
            </TabPanel>
            <TabPanel value="5">
            {InprogressRMAQuery.isLoading || InprogressRMAQuery.isError ? <><div className=''>No RMA requests</div></> :
            <>
              <TableNew headers={headers} pages={InprogressRMAQuery.data.pages} query={InprogressRMAQuery} menu={ActionMenu} />
              </>
            } 
            </TabPanel>
            <TabPanel value="6">
            {ClosedRMAQuery.isLoading || ClosedRMAQuery.isError ? <><div className=''>No RMA requests</div></> :
            <>
              <TableNew headers={headers} pages={ClosedRMAQuery.data.pages} query={ClosedRMAQuery} menu={ActionMenu} />
              </>
            } 
            </TabPanel>
      </Box>
            
            </TabContext>
          </>
          )
    } 
    default: { 
      return(
        <>
        <h2 className="pagetitle">RMA requests </h2>
        <RmaSearch/>
       <TabContext value={value}>
       <Box sx={{ paddingLeft:10, marginTop: 3}}>
        <Tabs centered onChange={handleChange} TabIndicatorProps={{style: {backgroundColor: "#D97D54"}}} 
        sx={{"& button:focus": { backgroundColor: "#063970", color:"white", width: 190, height: 110}}}>
            <Tab label="Pending" value="1" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            <Tab label="Approved" value="2" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            <Tab label="Received" value="3" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
            <Tab label="Verified" value="4" sx={{color:"grey", backgroundColor: "White",borderRadius: 2, marginRight: 2,height: 100, width: 180,}}/>
        </Tabs>
      </Box>
        
  <Box sx={{marginTop:-5}}>
         <TabPanel value="1">
        {PendingRMAQuery.isLoading || PendingRMAQuery.isError ? null :
        <>
          <TableNew headers={headers} pages={PendingRMAQuery.data.pages} query={PendingRMAQuery} menu={ActionMenu} />
          </>
        }
        </TabPanel>
        <TabPanel value="2">
        {ApprovedRMAQuery.isLoading || ApprovedRMAQuery.isError ? null :
        <>
          <TableNew headers={headers} pages={ApprovedRMAQuery.data.pages} query={ApprovedRMAQuery} menu={ActionMenu} />
          </>
        }
        </TabPanel>
        <TabPanel value="3">
        {ReceivedRMAQuery.isLoading || ReceivedRMAQuery.isError ? null :
        <>
          <TableNew headers={headers} pages={ReceivedRMAQuery.data.pages} query={ReceivedRMAQuery} menu={ActionMenu} />
          </>
        }
        </TabPanel>
        <TabPanel value="4">
        {VerifiedRMAQuery.isLoading || VerifiedRMAQuery.isError ? <><div className=''>No RMA requests</div></> :
        <>
          <TableNew headers={headers} pages={VerifiedRMAQuery.data.pages} query={VerifiedRMAQuery} menu={ActionMenu} />
          </>
        } 
        </TabPanel>
  </Box>
        
        </TabContext>
      </>
      )
    } 
}

};
export default Rmatabs;


