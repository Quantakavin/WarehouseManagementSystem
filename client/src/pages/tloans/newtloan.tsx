import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddDeleteTableRows from "./TLoanTable/AddDeleteRows";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom"

function newtloan() {

    const [type, setType] = useState('')
    const [company,setCompany] = useState('')
    const [number,setNumber] = useState('')
    const [requestor,setRequestor] = useState('')
    const [purpose,setPurpose] = useState('')
    const [applicationdate,setADate] = useState('')
    const [duration,setDuration] = useState('')
    const [requireddate,setRdate] = useState('')
    const [pick,setPick] = useState('')
    const [remarks,setRemarks] = useState('')
    const [user,setUser] = useState('')
    const [email,setEmail] = useState('')
    const [items,setItems] = useState([{}])

    const navigate = useNavigate()
  
    const submitLoan =(e) => {
      e.preventDefault()
       try {
  
        const results = axios.post('http://localhost:5000/api/tloan/newloan',{
          type,
          company,
          number,
          requestor,
          purpose,
          applicationdate,
          duration,
          requireddate,
          pick,
          remarks,
          user,
          email,
          items
        })
        console.log(results)
       } catch( error) {
        console.log(error.response)
       }
  
    }
  
  const getCard = () => {
    return (
      <div>
        <Card
          sx={{
            width: 800,
            height: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardMedia />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 3,
                marginLeft: -10,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box sx={{ marginLeft: 5 }}>
                <div style={{}}>Customer Email</div>
                <div style={{ color: "black", fontWeight: "normal" }}>dd</div>
              </Box>
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="div"
              sx={{
                marginTop: 3,
                marginLeft: 6.5,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <div>Item List</div>
            </Typography>
            <AddDeleteTableRows />

            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 3,
            }}
          >
            <Button size="small" onClick={() => navigate("/tloan")}>
              Back
            </Button>

            <Button size="small">Apply Extension</Button>
          </Box>
        </Card>
      </div>
    );
  };
  return <>{getCard()}</>;
}

export default newtloan;
