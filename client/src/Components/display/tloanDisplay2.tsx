import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { GetDetails }from "../../api/TLoanDB"
import { motion } from "framer-motion";
import ModalButton from "./TloanModal/modal";
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
      type: "number",
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
                      sx={{ display: "flex" }}
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
                      alignItems: "center",
                    }}
                  >
                    <motion.div
                      className="animatable"
                      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                      whileTap={{ scale: 0.9 }}
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
                    </motion.div>
                    <ModalButton />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
      // <div>
      //   <h2 className="pagetitle">{loans.TLoanNumber}</h2>
      //   <Card
      //     sx={{
      //       width: "100%",
      //       height: "100%",
      //       marginLeft: "auto",
      //       marginRight: "auto",
      //     }}
      //   >
      //     <CardContent>
      //       {/* <Typography
      //         gutterBottom
      //         variant="subtitle2"
      //         component="div"
      //         sx={{
      //           marginTop: 3,
      //           marginLeft: 6.5,
      //           color: "#063970",
      //           fontWeight: "bold",
      //         }}
      //       >
      //         <div>Item List</div>
      //       </Typography> */}

      //     </CardContent>
      //   </Card>
      // </div>
    );
  };

  return <div>{getData()}</div>;
}
