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

export default function TLoanDisplay2() {
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

  const columns: GridColumns = [
    {   
      field: "ItemNo", 
      headerName: "Item Number", 
      width: 180,
      editable: false },
    {
      field: "BatchNo",
      headerName: "Batch Number",
      width: 180,
      editable: false,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 120,
      editable: false,
    },
  ];

  const getData = () => {
    return (
      <div>
        <h2 className="pagetitle">{loans.TLoanNumber}</h2>
        <Card
          sx={{
            width: 800,
            height: 580,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardContent>
            {/* <Typography
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
            </Typography> */}
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                    marginBottom: -5,
                    marginLeft: -10,
                    color: "#063970",
                    fontWeight: "bold",
                  }}
                >
                  <Box>
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
              <Grid item xs={8}>
                <DataGrid
                  sx={{ height: 300, width: 500, marginLeft:6.5}}
                  rows={items}
                  columns={columns}
                  editMode="row"
                  getRowId={(item) => item.ItemNo}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  sx={{ width: 200, marginLeft: 1.5 }}
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
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: -5,
                }}
              >
                <Button size="small" onClick={() => navigate("/tloan")}>
                  Back
                </Button>
                <Button size="small" onClick={() => navigate("/tloan")}>
                  Apply for Extension
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  };

  return <div>{getData()}</div>;
 
}
