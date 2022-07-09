import React from 'react'
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import axios from "axios";


export default function rmaDisplay() {
    const [details, setDetails] = useState([]);
    const [rma, setRma] = useState([]);
   
    let { RMANo } = useParams();
    
    useEffect(() => {
      // declare the async data fetching function
      const fetchData = async () => {
        // get the data from the api
        const rma = await axios.get(`http://localhost:5000/api/RMADetails/${RMANo}`);
       
        setRma(rma.data)
        
      
      }
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);;
    }, [])
    
    const getData = () => {

      let html = []
      console.log(rma)

      html.push(
      rma.map((rma)=>{
        const { ContactPerson, CustomerEmail, Company, ContactNo, ItemCode, InvoiceNo, DoNo, DateOfPurchase, ReturnReason, Instructions, CourseOfAction, ProductID, Quantity} = rma
        return (
           <div>
          {ContactPerson}
          <br></br>
          <strong>{CustomerEmail}</strong>
          <br></br>
          <strong>{Company}</strong>
          <br></br>
          <strong>{ContactNo}</strong>
          <br></br>
          <strong>{ItemCode}</strong>
          <br></br>
          <strong>{InvoiceNo}</strong>
          <br></br>
          <strong>{DoNo}</strong>
          <br></br>
          <strong>{ReturnReason}</strong>
          <br></br>
          <strong>{DateOfPurchase}</strong>
          <br></br>
          <strong>{Instructions}</strong>
          <br></br>
          <strong>{CourseOfAction}</strong>
          <br></br>
          <strong>{ProductID}</strong>
          <br></br>
          <strong>{Quantity}</strong>
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
