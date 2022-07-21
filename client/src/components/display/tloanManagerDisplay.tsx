import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
//import { GetDetails }from "../../api/TLoanDB"
import ModalButton from './TloanModal/modal'
import TLoanRejectModalButton from "./TloanModal/tloanRejectModal";


export default function TLoanManagerDisplay() {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  //const [loanDetails, setLoanDetails] = useState([]);
  const [loans, setLoans] = useState([]);
  const [items, setItems] = useState([]);

  let { TLoanNumber } = useParams();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const loans = await axios.get(
        `http://localhost:5000/api/tloans/${TLoanNumber}`
      );

      setLoans(loans.data);

      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const items = await axios.get(
        `http://localhost:5000/api/tloanitems/${TLoanNumber}`
      );

      setItems(items.data);

      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const ApproveLoan = async()=>{
    axios.put(`http://localhost:5000/api/tloan/approve/${TLoanNumber}`)
    .then(() => navigate("/tloan"))
    .catch((error) => {
      console.error("There was an error!", error);
    });
  }

  const columns: GridColumns = [
    {
      field: "ItemNo",
      headerName: "Item Number",
      flex: 10,
      editable: false,
    },
    {
      field: "BatchNo",
      headerName: "Batch Number",
      flex: 10,
      editable: false,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      flex: 2,
      editable: false,
      type: "number"
    },
  ];

  const getData = () => {
    return (
      <Box sx={{ padding: 3, paddingBottom: 0, height: "100%", width: "100%" }}>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>

            <Card>
              <CardContent>
                <Grid container spacing={8}>
                  <Grid item xs={12}>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{
                        display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // marginTop: 2,
                        // marginBottom: -5,
                        // marginLeft: -10,
                        color: "#063970",
                        fontWeight: "bold",
                      }}
                    >
                      <h2>TLoan {loans.TLoanNumber}</h2>
                      <Box sx={{ marginLeft: 5 }}>
                        <div>Loan No.</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.TLoanNumber}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div>Start Date:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.StartDate}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{}}>End Date:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.EndDate}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{}}>Company Name:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.CompanyName}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{}}>Customer Email:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.CustomerEmail}
                        </div>
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 16 }}
                      rows={items}
                      columns={columns}
                      editMode="row"
                      getRowId={(item) => item.ItemNo}
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      sx={{ display: 'flex' }}
                      id="With normal TextField"
                      // label="Shipping Address"
                      multiline
                      rows={11.5}
                      disabled
                      defaultValue={loans.TLoanNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -5,
                        marginLeft: -10,
                        color: "#063970",
                        fontWeight: "bold",
                      }}
                    >
                      <Box>
                        <div>Collection Type</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          Self-Collection
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div>TypeStart Date:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          External
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{}}>Status</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          Pending
                        </div>
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    component="span"
                    sx={{
                      component: "span",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#063970",
                        height: "100%",
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                      }}
                      onClick={() => navigate("/tloan")}
                    >
                      Back
                    </Button>
                    <Box sx={{float:"right", display:"flex"}}>
                  <TLoanRejectModalButton/>
                 
                      <Button
                        size="small"
                            variant="contained"
                            sx={{
                            color: "white",
                            backgroundColor: "green",
                            height: "100%",
                            width: 200,
                            height: 50,
                            borderRadius: 10,
                            marginRight:5,
                            marginLeft: 4
                            }}
                            onClick={ApproveLoan}
                        >
                      Approve
                    </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
   
    );
  };

  return <div>{getData()}</div>;
}
