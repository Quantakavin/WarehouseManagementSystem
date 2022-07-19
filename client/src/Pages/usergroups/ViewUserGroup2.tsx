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
import { Box, Grid, Stack } from "@mui/material";
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

export default function ViewUserGroup2() {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  //const [loanDetails, setLoanDetails] = useState([]);
  const [features, setFeatures] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const details = await axios.get(
        `http://localhost:5000/api/usergroup/${id}`
      );

      setDetails(details.data);

      // setLoan(Object.e)
    };
    const fetchFeatures = async () => {
      // get the data from the api
      const features = await axios.get(
        `http://localhost:5000/api/groupfeatures/${id}`
      );

      setFeatures(features.data);

      // setLoan(Object.e)
    };
    // call the function
    fetchData();
    fetchFeatures()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const columns: GridColumns = [
    {
      field: "FeatureID",
      headerName: "ID",
      width: 50,
      editable: false,
    },
    {
      field: "FeatureName",
      headerName: "Feature",
      width: 400,
      editable: false,
    },
    {
      field: "FeatureRight",
      headerName: "Access Rights",
      width: 120,
      editable: false,
    },
  ];

  const getData = () => {
    return (
      <div>
        <h2 className="pagetitle">{details.UserGroupName}</h2>
        <Card
          sx={{
            width: 1100,
            height: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={5}>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="div"
                  sx={{
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center",
                    marginTop: 2,
                    // marginBottom: -5,
                    marginLeft: 3,
                    color: "#063970",
                    fontWeight: "bold",
                  }}
                >
                  <Box>
                    <div>{details.UserGroupName}</div>
                    <div style={{ color: "black", fontWeight: "normal" }}>
                      {details.UserGroupDesc}
                    </div>
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <DataGrid
                  sx={{ height: 500, width: 580 }}
                  rows={features}
                  columns={columns}
                  editMode="row"
                  getRowId={(item) => item.FeatureID}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No Features
                      </Stack>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} sx={{marginTop: 2}}>
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
              <Grid item xs={6} justifyContent="right" sx={{marginTop: 2}}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#063970",
                    width: 150,
                    height: 40,
                    marginLeft: 45,
                  }}
                  onClick={() => navigate(`/editusergroup/${id}`)}
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
