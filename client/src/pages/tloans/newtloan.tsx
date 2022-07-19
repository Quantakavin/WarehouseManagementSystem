
import React from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddDeleteTableRows from './TLoanTable/AddDeleteRows'
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
import TextField from '@mui/material/TextField';
import { CompanyName, LoanType, CollectionType, DurationOfLoan } from './Dropdown/dropDown';
import {useNavigate} from 'react-router-dom'

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
  const [collection,setCollection] = useState('')
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
        collection,
        items
      })
      console.log(results)
     } catch( error) {
      console.log(error.response)
     }

  }

  useEffect(()=>{
    const date = new Date().toLocaleString() + ""
    setADate(date)
  })
  
  useEffect(()=>{
    const loanNumber = 1
    setNumber(loanNumber)
  })

  useEffect(()=>{
    const id = 1
    setUser(id)
  })
    
  const getCard = () => {

  return (
      <div>

          <h2 className="pagetitle">Apply TLoan</h2>
      <form onSubmit={submitLoan}>
      <Card sx={{ width: 800, height: 450, marginLeft: 'auto', marginRight: 'auto'}}>
      <CardMedia
      
      />
      <CardContent> 
        <AddDeleteTableRows />
        
        
        <Box sx={{marginLeft: 2, marginTop: 1, display: 'flex'}}>
        <TextField id="outlined-basic" label="Employee Name" variant="outlined" size='small' />
        <TextField id="outlined-basic" label="Customer Email" variant="outlined" size='small' sx={{marginLeft: 3}} />
        <CompanyName />

        </Box>

        <Box sx={{display: 'flex'}}>

        <TextField sx={{width: 500, marginLeft:2, marginTop:2}}
          multiline
          rows={5.2}
          label="Purpose"
         
        ></TextField>
        <Box sx={{float: 'right', marginRight: 10.5}}>
        <DurationOfLoan />
        <CollectionType/>
        <LoanType/>
        </Box>

        </Box>
      
        
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
      </CardContent>
      <Box sx={{display:'flex', paddingTop: 3, marginLeft:  4}}>
        <Button size="small" variant="contained" sx={{color: 'white', backgroundColor: '#063970', width:150, height: 40, float: 'left'}} onClick={()=>navigate('/tloan')}>Back</Button>
        <Button size="small" variant="contained" sx={{color: 'white', backgroundColor: '#063970', width:150, height: 40,marginLeft:24}}>Save Draft</Button>
        <Button size="small" variant="contained" sx={{color: 'white', backgroundColor: '#063970', width:150, height: 40, marginLeft:3}} type='submit'>Submit</Button>

      </Box>
      
    </Card>
    </form>
    </div>
    ) 
  }
  return (
    <>
    
    {getCard()}
   
   </>
  )
}

export default newtloan