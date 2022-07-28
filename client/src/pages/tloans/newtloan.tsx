import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dateFormat from "dateformat";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../../components/alerts/SweetAlert";
import "./TLoanTable/table.css";
import { useBasket } from "../../components/context/basketContext";

function newtloan() {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useBasket();

  const [productGet, setProductGet] = useState([]);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const product = await axios.get(
        `http://localhost:5000/api/products?limit=100000&page=0`
      );
      setProductGet(product.data);
      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const newProduct = productGet.map(
    ({ BinProductPK, ItemNo, ItemName, BatchNo, WarehouseCode, quantity }) => ({
      id: BinProductPK,
      ItemNo: ItemNo,
      ItemName: ItemName,
      BatchNo: BatchNo,
      WarehouseCode: WarehouseCode,
      Quantity: quantity,
    })
  );

  const itemStorage = localStorage.getItem("Loan-Basket");
  const cartItems = JSON.parse(itemStorage);

  // for(var item of cartItems){
  //   cartItems.push(item.id);

  //   const basketItem = newProduct.find(p => p.id === item.id)
  //   if (basketItem == null) return null
  //   console.log(basketItem)
  // }

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    // const handleClick = () => {
    //   const id = randomId();
    //   setRows((oldRows) => [
    //     ...oldRows,
    //     { id, ItemNo: "", ItemName: "", isNew: true },
    //   ]);
    //   setRowModesModel((oldModel) => ({
    //     ...oldModel,
    //     [id]: { mode: GridRowModes.Edit, fieldToFocus: "ItemNo" },
    //   }));

    // };

    // return (
    //   <GridToolbarContainer>
    //     <Button color="primary" startIcon={<AddIcon />} onClick={handleClick()}>
    //       Add Record
    //     </Button>
    //   </GridToolbarContainer>

    // );
  }

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  useEffect(() => {
    if (cartItems === []) {
      return console.log("Nothing in basket");
    } else {
      setRows(cartItems);
    }
  }, [cartItems]);

  const FullFeaturedCrudGrid = () => {
    const handleRowEditStart = (
      params: GridRowParams,
      event: MuiEvent<React.SyntheticEvent>
    ) => {
      event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
      params,
      event
    ) => {
      event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
      setRows(rows.filter((row) => row.id === id && removeFromCart(row.id)));
    };
    const handleMinusClick = (id: GridRowId) => () => {
      setRows(
        rows.filter((row) => row.id === id && decreaseCartQuantity(row.id))
      );
    };
    const handleAddClick = (id: GridRowId) => () => {
      setRows(
        rows.filter((row) => row.id === id && increaseCartQuantity(row.id))
      );
    };

    const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find((row) => row.id === id);
      if (editedRow!.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

      return updatedRow;
    };

    const columns: GridColumns = [
      { field: "ItemNo", headerName: "Item No.", width: 165, editable: false },
      {
        field: "ItemName",
        headerName: "Item Name",
        width: 180,
        editable: false,
      },
      {
        field: "BatchNo",
        headerName: "Batch No.",
        width: 165,
        editable: false,
      },
      {
        field: "WarehouseCode",
        headerName: "WarehouseCode",
        width: 165,
        editable: false,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        type: "number",
        editable: true,
      },

      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 120,
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<RemoveIcon style={{ color: "red" }} />}
              label="Edit"
              className="textPrimary"
              onClick={handleMinusClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<AddIcon style={{ color: "green" }} />}
              label="Edit"
              className="textPrimary"
              onClick={handleAddClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];

    return (
      <Box
        sx={{
          height: 300,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.id}
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={{
            Toolbar: EditToolbar,
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No products added
              </Stack>
            ),
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    );
  };

  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  // const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [applicationdate, setADate] = useState("");
  const [duration, setDuration] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [collection, setCollection] = useState("");
  const [requireddate, setRDate] = useState("");
  const [localDate, setLocalDate] = useState("");
  const userRole = useAppSelector(selectRole);
  const [dateForm, setDateForm] = useState("");

  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(newProduct);
  });

  // const items = rows.map(({ id, isNew, ...rows }) => rows);
  // console.log(items);

  const handleChangeCompany = (event: SelectChangeEvent) => {
    setCompany(event.target.value);
  };

  const handleChangeDuration = (event: SelectChangeEvent) => {
    setDuration(event.target.value);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleChangeCollection = (event: SelectChangeEvent) => {
    setCollection(event.target.value);
  };

  const handleChangeRequiredDate = (newValue: "" | null) => {
    setDateForm(newValue);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const correctFormat = dateFormat(dateForm, "yyyy-mm-dd");
    setRDate(correctFormat);
  }, [dateForm]);

  const submitLoan = (e) => {
    e.preventDefault();
    try {
      const results = axios
        .post("http://localhost:5000/api/tloan/newloan", {
          type,
          company,
          name,
          purpose,
          applicationdate,
          duration,
          requireddate,
          user,
          email,
          collection,
          items,
        })
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "TLoan Successfully Submitted",
            customClass: "swalpopup",
            timer: 1500,
            width: 700,
          });
          navigate("/tloan");
          localStorage.removeItem("react-use-cart");
        });

      console.log(results);
    } catch (error) {
      console.log(error.response);
    }
  };

  const DraftLoan = (e) => {
    e.preventDefault();
    try {
      const results = axios
        .post("http://localhost:5000/api/tloan/loanDrafting", {
          type,
          company,
          name,
          purpose,
          applicationdate,
          duration,
          requireddate,
          user,
          email,
          collection,
          items,
        })
        .then(() => {
          Toast.fire({
            icon: "info",
            title: "TLoan has been put into Draft",
            customClass: "swalpopup",
            timer: 1500,
            width: 700,
          });
          navigate("/tloan");
          localStorage.removeItem("react-use-cart");
        });

      console.log(results);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    var date = new Date().toISOString().split("T")[0];

    setADate(date);
  });

  // useEffect(() => {
  //   var date = new Date().toISOString().split("T")[0];

  //   setRDate(date);
  // });

  useEffect(() => {
    const uid = localStorage.getItem("user_id");
    setUser(uid);
  });

  useEffect(() => {
    const Employee = localStorage.getItem("username");
    setName(Employee);
  });

  const getCard = () => {
    const loanDuration = [
      { "1 Week": "7" },
      { "2 Weeks": "14" },
      { "3 Weeks": "21" },
      { "1 Month": "30" },
      { "2 Months": "60" },
      { "3 Months": "90" },
      { "4 Months": "120" },
      { "5 Months": "150" },
      { "6 Months": "180" },
      { "7 Months": "210" },
      { "8 Months": "240" },
      { "9 Months": "270" },
      { "10 Months": "300" },
      { "11 Months": "330" },
      { "12 Months": "365" },
    ];
    return (
      <div style={{ overflow: "auto" }}>
        <Card
          sx={{ width: "95%", height: "100%", margin: 3, overflow: "auto" }}
        >
          <CardContent>
            <h2>Apply TLoan</h2>
            {FullFeaturedCrudGrid()}
            <form onSubmit={submitLoan} style={{ width: "100%" }}>
              <Box sx={{ marginTop: 1, display: "flex", marginLeft: 2 }}>
                <TextField
                  id="outlined-basic"
                  label="Employee Name"
                  variant="outlined"
                  size="small"
                  value={name}
                  disabled
                />

                <TextField
                  id="outlined-basic"
                  label="Customer Email"
                  variant="outlined"
                  size="small"
                  name="customerEmail"
                  sx={{ marginLeft: 3 }}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />

                <FormControl sx={{ width: 200, marginLeft: 3 }}>
                  <InputLabel>Customer Company</InputLabel>
                  <Select
                    id="outlined-basic"
                    value={company}
                    onChange={handleChangeCompany}
                    size="small"
                    label="Customer Company"
                    required
                  >
                    <MenuItem value={"1"}>SERVO_LIVE</MenuItem>
                    <MenuItem value={"2"}>LEAPTRON_LIVE</MenuItem>
                    <MenuItem value={"3"}>DIRAK181025</MenuItem>
                    <MenuItem value={"4"}>PMC_LIVE</MenuItem>
                    <MenuItem value={"5"}>PORTWELL_LIVE</MenuItem>
                    <MenuItem value={"6"}>ALL</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: 200, marginLeft: 3 }}>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    id="outlined-basic"
                    value={duration}
                    onChange={handleChangeDuration}
                    label="Duration"
                    size="small"
                    required
                  >
                    {loanDuration.map((element) => {
                      const [[key, val]] = Object.entries(element);
                      return (
                        <MenuItem value={val} key={key}>
                          {key}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: 970, marginLeft: 2, marginTop: 2 }}
                  multiline
                  rows={4}
                  label="Purpose"
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                ></TextField>
              </Box>
              <Box sx={{ marginLeft: 2, display: "flex" }}>
                {/* Collection */}
                <FormControl sx={{ width: 200, marginTop: 2 }}>
                  <InputLabel>Collection Type</InputLabel>
                  <Select
                    id="outlined-basic"
                    value={collection}
                    onChange={handleChangeCollection}
                    label="Collection Type"
                    size="small"
                    required
                  >
                    {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                    <MenuItem value={"Self-Collection"}>
                      Self-Collection
                    </MenuItem>
                    <MenuItem value={"Delivery"}>Delivery</MenuItem>
                  </Select>
                </FormControl>

                {/* Type */}
                <FormControl sx={{ width: 200, marginLeft: 3, marginTop: 2 }}>
                  <InputLabel>Loan Type</InputLabel>
                  <Select
                    id="outlined-basic"
                    value={type}
                    onChange={handleChangeType}
                    label="Loan Type"
                    size="small"
                    required
                  >
                    <MenuItem value={"1"}>Internal</MenuItem>
                    <MenuItem value={"2"}>External</MenuItem>
                  </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack>
                    <DesktopDatePicker
                      label="Required Date"
                      inputFormat="yyyy-MM-dd"
                      value={requireddate}
                      onChange={handleChangeRequiredDate}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ width: 200, marginLeft: 3, marginTop: 2 }}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
              </Box>

              <Box
                component="span"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ paddingTop: 2 }}
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
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                </motion.div>
                <Box display="flex">
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
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                      onClick={DraftLoan}
                    >
                      Save Draft
                    </Button>
                  </motion.div>
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
                        backgroundColor: "#31A961",
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                      }}
                      type="submit"
                      // onClick={submitLoan}
                    >
                      Submit
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };
  return getCard();
}

export default newtloan;
