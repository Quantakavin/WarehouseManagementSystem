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


export default function tloanDisplay() {

  


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image=""
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">uhh</Button>
        <Button size="small">More</Button>
      </CardActions>
    </Card>
  );

  //   const [details, setDetails] = useState([]);
  //   const [loans, setLoans] = useState([]);
   
  //   let { TLoanNumber } = useParams();
    
  //   useEffect(() => {
  //     // declare the async data fetching function
  //     const fetchData = async () => {
  //       // get the data from the api
  //       const loan = await axios.get(`http://localhost:5000/api/tloans/${TLoanNumber}`);
       
  //       setLoans(loan.data)
        
      
  //     }
  //     // call the function
  //     fetchData()
  //       // make sure to catch any error
  //       .catch(console.error);;
  //   }, [])
    
    
  //   const getData = () => {

  //     let html = []

  //     html.push(
  //     loans.map((loan)=>{
       
  //       const { TLoanNumber, Requestor} = loan
  //       return (
  //          <div>
  //         {Requestor}
  //         <strong>{TLoanNumber}</strong>
  //       </div>
  //       )
  //     })
  //     )
  //     return html
  //   }
  


  // return (
  //  <div>
  //   {getData()}
  //  </div>
        
    
  // )
}
