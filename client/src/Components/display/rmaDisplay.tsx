import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
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
import TextField from '@mui/material/TextField';
//import { GetDetails }from "../../api/TLoanDB"


export default function rmaDisplay() {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    //const [loanDetails, setLoanDetails] = useState([]);
    const [rma, setLoans] = useState([]);
   
    let { RMANo } = useParams();
    
    useEffect(() => {
      // declare the async data fetching function
      const fetchData = async () => {
        // get the data from the api
        const rma = await axios.get(`http://localhost:5000/api/RMADetails/${RMANo}`);
       
        setLoans(rma.data)
        
        // setLoan(Object.e)
      
      }
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);;
    }, [])

    console.log(rma.RMAProducts)
    
    
    
   
    const table = () =>{
      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.action.hover,
          color: "#063970",
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 12,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(
        ItemCode: string,
        InvoiceNo: string,
        DoNo: string,
        DateOfPurchase: string,
        ReturnReason: string,
        Instructions: string,
        CourseOfAction: string
      ) {
        return {ItemCode, InvoiceNo, DoNo, DateOfPurchase, ReturnReason, Instructions, CourseOfAction};
      }
      const products = rma.RMAProducts
     
      return (
        <TableContainer component={Paper} sx={{width:750, marginLeft: 1, overflow: "hidden"}}>
      <Table sx={{ width: 750, maxHeight:400 }} aria-label="customized table">
        <TableHead >
          <TableRow >
            <StyledTableCell align="center">Item Code</StyledTableCell>
            <StyledTableCell align="center">Invoice Number</StyledTableCell>
            <StyledTableCell align="center">D.O Number</StyledTableCell>
            <StyledTableCell align="center">Date Of Purchase</StyledTableCell>
            <StyledTableCell align="center">Reason for Return</StyledTableCell>
            <StyledTableCell align="center">Instructions</StyledTableCell>
            <StyledTableCell align="center">Action Taken</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <StyledTableRow key={product.ItemNo}>
              <StyledTableCell align="center" component="th" scope="row">
                {product.ItemNo}
              </StyledTableCell>
              <StyledTableCell align="center">{product.ItemCode}</StyledTableCell>
              <StyledTableCell align="center">{product.InvoiceNo}</StyledTableCell>
              <StyledTableCell align="center">{product.DoNo}</StyledTableCell>
              <StyledTableCell align="center">{product.DateOfPurchase}</StyledTableCell>
              <StyledTableCell align="center">{product.ReturnReason}</StyledTableCell>
              <StyledTableCell align="center">{product.Instructions}</StyledTableCell>
              <StyledTableCell align="center">{product.CourseOfAction}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      )
    }
    const getData = (RMANo, ContactPerson, CustomerEmail, Company, ContactNo) => {

    

      
  
       console.log(rma)
      return (
        
           <div>
         
         <h2 className="pagetitle">{rma.RMANo}</h2>
          <Card sx={{ width: 800, height: 400, marginLeft: 'auto', marginRight: 'auto'}}>
        <CardMedia
        
        />
        <CardContent> 
           <Typography gutterBottom variant="subtitle2" component="div" sx={{display: 'flex',justifyContent:'center', alignItems:'center', marginTop: 3, color:'#063970', fontWeight: 'bold'}}>
           <Box>
           <div >Date Applied:</div>
           <div style={{color: "black", fontWeight: "normal"}}>{rma.DateTime}</div>
           </Box >
           <Box sx={{marginLeft: 5}}>
           <div >Customer Name:</div>
           <div style={{color: "black", fontWeight: "normal"}}>{rma.ContactPerson}</div>
           </Box>
           <Box sx={{marginLeft: 5}}>
           <div style={{}}>Customer Email:</div>
           <div style={{color: "black", fontWeight: "normal"}}>{rma.CustomerEmail}</div>
           </Box>
           <Box sx={{marginLeft: 5}}>
           <div style={{}}>Company Name:</div>
           <div style={{color: "black", fontWeight: "normal"}}>{rma.CompanyName}</div>
           </Box>
           <Box sx={{marginLeft: 5}}>
           <div style={{}}>Contact Number:</div>
           <div style={{color: "black", fontWeight: "normal"}}>{rma.ContactNo}</div>
           </Box>


          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div" sx={{marginTop: 3 , marginLeft: 6.5,color:'#063970', fontWeight: 'bold'}}>
          <div>Product List</div>
          
          </Typography>
          <Box sx={{display:'flex'}}> 
            {table()}
            {/* <Box sx={{ marginLeft : 2 }} >
              <TextField
              id="With normal TextField"
              // label="Shipping Address"
              multiline
              rows={5.5}
              disabled
             
              defaultValue={rma.RMANo}
              
              />
            </Box> */}
          </Box>
         
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
        <Box sx={{display:'flex',justifyContent:'center', alignItems:'center', paddingTop: 3}}>
          <Button size="small" onClick={() => navigate("/rma")}>Back</Button>
         </Box>
        
      </Card>
        </div>
        
    
      )
     
    }
  


  return (
   <div>
    {getData()}
   </div>
        
    
  )
}

