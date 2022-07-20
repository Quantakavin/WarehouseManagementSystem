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

export default function ViewUser2() {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  //const [loanDetails, setLoanDetails] = useState([]);
  const [notigroups, setNotigroups] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const details = await axios.get(
        `http://localhost:5000/api/user/${id}`
      );

      setDetails(details.data);
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
      const notigroups = await axios.get(
        `http://localhost:5000/api/usersgroups/${id}`
      );

      setNotigroups(notigroups.data);

      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const columns: GridColumns = [
    {   
      field: "NotiGroupName", 
      headerName: "Notification Group", 
      width: 200,
      editable: false },
    {
      field: "NotiGroupID",
      headerName: "ID",
      width: 80,
      editable: false,
    }
  ];

  const getData = () => {
    return (
      <div>
        <h2 className="pagetitle">{details.Username}</h2>
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
              <Grid item xs={6}>
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
                    <div>Email</div>
                    <div style={{ color: "black", fontWeight: "normal", paddingBottom: 20 }}>
                      {details.Email}
                    </div>
                    <div>Company</div>
                    <div style={{ color: "black", fontWeight: "normal", paddingBottom: 20 }}>
                      {details.CompanyName}
                    </div>
                    <div style={{}}>User Group</div>
                    <div style={{ color: "black", fontWeight: "normal", paddingBottom: 20 }}>
                      {details.UserGroupName}
                    </div>
                    <div style={{}}>Contact Number</div>
                    <div style={{ color: "black", fontWeight: "normal", paddingBottom: 20 }}>
                      {details.MobileNo}
                    </div>
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <DataGrid
                  sx={{ height: 400, width: 300 }}
                  rows={notigroups}
                  columns={columns}
                  editMode="row"
                  getRowId={(item) => item.NotiGroupID}
                  experimentalFeatures={{ newEditingApi: true }}
                  rowsPerPageOptions={[10]}
                />
              </Grid>
              <Grid item xs={6} sx={{marginTop: 4}}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#063970",
                    width: 150,
                    height: 40,
                    marginLeft: 3,
                  }}
                  onClick={() => navigate("/usergroups")}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6} justifyContent="right" sx={{marginTop: 4}}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#063970",
                    width: 150,
                    height: 40,
                    marginLeft: 22,
                  }}
                  onClick={() => navigate(`/edituser/${id}`)}
                >
                  Edit
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
