import React from 'react'
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles'
//import { GetDetails }from "../../api/TLoanDB"


export default function tloanDisplay() {

  

    const [details, setDetails] = useState([]);
    const [loans, setLoans] = useState([]);
   
    let { TLoanNumber } = useParams();
    
    useEffect(() => {
      // declare the async data fetching function
      const fetchData = async () => {
        // get the data from the api
        const loan = await axios.get(`http://localhost:5000/api/tloans/${TLoanNumber}`);
       
        setLoans(loan.data)
        
      
      }
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);;
    }, [])
    
    console.log(loans)
   
    const table = () =>{
      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.action.hover,
          color: "#063970",
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(
        itemName: string,
        batchNo: string,
        quantity: number
      ) {
        return { itemName, batchNo, quantity };
      }
      
     
      return (
        <TableContainer component={Paper} sx={{width:500, marginLeft: 6.5}}>
      <Table sx={{ width: 500, maxHeight:400 }} aria-label="customized table">
        <TableHead >
          <TableRow >
            {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
            {/* <StyledTableCell align="right">Calories</StyledTableCell> */}
            <StyledTableCell align="center">Item Name</StyledTableCell>
            <StyledTableCell align="center">Batch No.</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <StyledTableRow key={loan.ItemNo}>
              <StyledTableCell align="center" component="th" scope="row">
                {loan.ItemNo}
              </StyledTableCell>
              <StyledTableCell align="center">{loan.BatchNo}</StyledTableCell>
              <StyledTableCell align="center">{loan.Quantity}</StyledTableCell>
              {/* <StyledTableCell align="right">{loans.}</StyledTableCell> */}
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      )
    }
    const getData = () => {

      let html = []

      html.push(
      loans.map((loan)=>{
       
        const { TLoanNumber, Requestor, EndDate, CompanyName, StartDate} = loan
        return (
           <div>
         
         <h2 className="pagetitle">{TLoanNumber} </h2>
          <Card sx={{ width: 800, height: 400, marginLeft: 'auto', marginRight: 'auto'}}>
        <CardMedia
        
        />
        <CardContent> 
           <Typography gutterBottom variant="subtitle2" component="div" sx={{display: 'flex',justifyContent:'center', alignItems:'center', marginTop: 3, marginLeft: -10,color:'#063970', fontWeight: 'bold'}}>
           <Box>
           <div >Loan No.</div>
           <div style={{color: "black", fontWeight: "normal"}}>{TLoanNumber}</div>
           </Box >
           <Box sx={{marginLeft: 5}}>
           <div >Start Date:</div>
           <div style={{color: "black", fontWeight: "normal"}}>{StartDate}</div>
           </Box>
           <Box sx={{marginLeft: 5}}>
           <div style={{}}>End Date:</div>
           <div style={{color: "black", fontWeight: "normal"}}>{EndDate}</div>
           </Box>
           <Box sx={{marginLeft: 5}}>
           <div style={{}}>Company Name:</div>
           <div style={{color: "black", fontWeight: "normal"}}>{CompanyName}</div>
           </Box>
           <Box sx={{marginLeft: 5}}>
           <div style={{}}>Customer Email</div>
           <div style={{color: "black", fontWeight: "normal"}}>{Requestor}</div>
           </Box>
           
          
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div" sx={{marginTop: 3 , marginLeft: 6.5,color:'#063970', fontWeight: 'bold'}}>
          <div>Item List</div>
          
          </Typography>
          {table()}
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">uhh</Button>
          <Button size="small">More</Button>
        </CardActions>
      </Card>
        </div>
        )
      })
      )
      return html
    }
  


  return (
   <div>
    {getData()}
   </div>
        
    
  )
}
