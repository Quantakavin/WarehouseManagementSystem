import FormHelperText from "@material-ui/core/FormHelperText";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { LoadingButton } from "@mui/lab";
import { Box, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
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
import { useCart } from "react-use-cart";
import "bootstrap/dist/css/bootstrap.min.css";
import Autocomplete from "@mui/material/Autocomplete";
import { Toast } from "../../components/alerts/SweetAlert";
import { useAppSelector } from "../../app/hooks";
import {
  selectPermissions,
  selectRole,
} from "../../app/reducers/CurrentUserSlice";

function newtloan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [applicationdate, setADate] = useState("");
  const [duration, setDuration] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [collection, setCollection] = useState("");
  const [requireddate, setRDate] = useState("");
  const [dateForm, setDateForm] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [typeError, setTypeError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [collectionError, setCollectionError] = useState(false);
  const [requireddateError, setRDateError] = useState(false);
  const [customerCompanyError, setCustomerCompanyError] = useState(false);
  const [typeErrorText, setTypeErrorText] = useState("");
  const [companyErrorText, setCompanyErrorText] = useState("");
  const [purposeErrorText, setPurposeErrorText] = useState("");
  const [durationErrorText, setDurationErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [collectionErrorText, setCollectionErrorText] = useState("");
  const [rdateErrorText, setRDateErrorText] = useState("");
  const [customerCompanyErrorText, setCustomerCompanyErrorText] = useState("");
  const permissions = useAppSelector(selectPermissions);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const ExternalApplication = permissions.some(
    (e) => e.FeatureName === "T-Loan Application (Internal+External)"
  );
  const InternalApplication = permissions.some(
    (e) => e.FeatureName === "T-Loan Application (Internal)"
  );

  useEffect(() => {
    if ((ExternalApplication || InternalApplication) !== true) {
      navigate("/403");
    }
  }, []);

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
  }
  const itemStorage = localStorage.getItem("react-use-cart");
  const cartItems = JSON.parse(itemStorage).items;

  const newProduct = cartItems.map(
    ({ id, ItemNo, ItemName, BatchNo, WarehouseCode, quantity }) => ({
      BasketItemID: id,
      ItemNo,
      ItemName,
      BatchNo,
      WarehouseCode,
      Quantity: quantity,
    })
  );
  const {
    isEmpty,
    totalUniqueItems,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  useEffect(() => {
    if (cartItems === []) {
      return console.log("Nothing in cart");
    }
    setRows(cartItems);
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
      setRows(rows.filter((row) => row.id === id && removeItem(row.id)));
    };
    const handleMinusClick = (id: GridRowId) => () => {
      setRows(
        rows.filter(
          (row) => row.id === id && updateItemQuantity(row.id, row.quantity - 1)
        )
      );
    };
    const handleAddClick = (id: GridRowId) => () => {
      setRows(
        rows.filter(
          (row) => row.id === id && updateItemQuantity(row.id, row.quantity + 1)
        )
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
      { field: "ItemNo", headerName: "Item No.", flex: 8, editable: false },
      {
        field: "ItemName",
        headerName: "Item Name",
        flex: 8,
        editable: false,
      },
      {
        field: "BatchNo",
        headerName: "Batch No.",
        flex: 8,
        editable: false,
      },
      {
        field: "WarehouseCode",
        headerName: "Warehouse Code",
        flex: 2,
        editable: false,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        flex: 2,
        type: "number",
        editable: true,
      },

      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        flex: 2,
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
            <Tooltip title="Increase">
              <GridActionsCellItem
                icon={<RemoveIcon style={{ color: "red" }} />}
                label="Edit"
                className="textPrimary"
                onClick={handleMinusClick(id)}
                color="inherit"
              />
            </Tooltip>,
            <Tooltip title="Reduce">
              <GridActionsCellItem
                icon={<AddIcon style={{ color: "green" }} />}
                label="Edit"
                className="textPrimary"
                onClick={handleAddClick(id)}
                color="inherit"
              />
            </Tooltip>,
            <Tooltip title="Remove">
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />
            </Tooltip>,
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
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    );
  };

  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(newProduct);
  }, [newProduct]);

  // const items = rows.map(({ id, isNew, ...rows }) => rows);
  // console.log(items);

  const handleChangeCompany = (event: SelectChangeEvent) => {
    setCompany(event.target.value);
    setCustomerCompany("NULL");
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

  useEffect(() => {
    const correctFormat = dateFormat(dateForm, "yyyy-mm-dd");
    setRDate(correctFormat);
  }, [dateForm]);

  const emailRegex = /^\S+@\S+\.\S+$/i;

  const submitLoan = (e) => {
    setSubmitLoading(true);
    e.preventDefault();
    setTypeError(false);
    setCompanyError(false);
    setPurposeError(false);
    setDurationError(false);
    setEmailError(false);
    setCollectionError(false);
    setRDateError(false);
    setCustomerCompanyError(false);
    if (items.length === 0) {
      Toast.fire({
        icon: "error",
        title: "Please add an item",
        customClass: "swalpopup",
        timer: 1500,
        width: 315,
      });
      setSubmitLoading(false);
    }
    if (type === "") {
      setTypeError(true);
      setTypeErrorText("Selection required");
      setSubmitLoading(false);
    }
    if (company === "") {
      setCompanyError(true);
      setCompanyErrorText("Selection required");
      setSubmitLoading(false);
    }
    if (purpose === "") {
      setPurposeError(true);
      setPurposeErrorText("Required");
      setSubmitLoading(false);
    }
    if (duration === "") {
      setDurationError(true);
      setDurationErrorText("Selection required");
      setSubmitLoading(false);
    }
    if (requireddate === "") {
      setRDateError(true);
      setRDateErrorText("Select a date");
      setSubmitLoading(false);
    }
    if (email === "") {
      setEmailError(true);
      setEmailErrorText("Required");
      setSubmitLoading(false);
    } else if (!email.match(emailRegex)) {
      setEmailError(true);
      setEmailErrorText("Invalid Email");
      setSubmitLoading(false);
    }
    if (collection === "") {
      setCollectionError(true);
      setCollectionErrorText("Selection required");
      setSubmitLoading(false);
    }
    if (customerCompany === "") {
      setCustomerCompanyError(true);
      setCustomerCompanyErrorText("Input a Company");
      setSubmitLoading(false);
    }
    if (
      items.length !== 0 &&
      type !== "" &&
      company !== "" &&
      purpose !== "" &&
      duration !== "" &&
      requireddate !== "" &&
      email !== "" &&
      email.match(emailRegex) &&
      collection !== "" &&
      customerCompany !== ""
    ) {
      setTimeout(() => {
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
              customerCompany,
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
            });

          console.log(results);
        } catch (error) {
          console.log(error.response);
          setSubmitLoading(false);
        }
      }, 500);
      emptyCart();
    }
  };

  const DraftLoan = (e) => {
    e.preventDefault();
    setLoading(true);
    setTypeError(false);
    setCompanyError(false);
    setPurposeError(false);
    setDurationError(false);
    setEmailError(false);
    setCollectionError(false);
    setRDateError(false);
    if (company === "") {
      setCompanyError(true);
      setCompanyErrorText("Selection required");
      setLoading(false);
    }
    if (email === "") {
      setEmailError(true);
      setEmailErrorText("Required");
      setLoading(false);
    } else if (!email.match(emailRegex)) {
      setEmailError(true);
      setEmailErrorText("Invalid Email");
      setLoading(false);
    }
    if (company !== "" && email !== "" && email.match(emailRegex)) {
      setTimeout(() => {
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
              customerCompany,
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
              // emptyCart();
            });

          console.log(results);
        } catch (error) {
          console.log(error.response);
          setLoading(false);
        }
      }, 500);
      emptyCart();
    }
  };

  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    const uid = localStorage.getItem("user_id");
    setUser(uid);
    setADate(date);
    const Employee = localStorage.getItem("username");
    setName(Employee);
  });

  const TLoanTypeAccess = () => {
    if (ExternalApplication === true) {
      return (
        <FormControl sx={{ width: 200, marginLeft: 3, marginTop: 2 }}>
          <InputLabel>Loan Type</InputLabel>
          <Select
            id="outlined-basic"
            value={type}
            onChange={handleChangeType}
            label="Loan Type"
            size="small"
            onBlur={() => {
              if (type === "") {
                setTypeError(true);
                setTypeErrorText("Selection required");
              }
            }}
            error={typeError}
          >
            <MenuItem value="1">Internal</MenuItem>
            <MenuItem value="2">External</MenuItem>
          </Select>
          <FormHelperText sx={{ color: "#d11919" }}>
            {typeErrorText}
          </FormHelperText>
        </FormControl>
      );
    }
    if (InternalApplication === true) {
      return (
        <FormControl sx={{ width: 200, marginLeft: 3, marginTop: 2 }}>
          <InputLabel>Loan Type</InputLabel>
          <Select
            id="outlined-basic"
            value={type}
            onChange={handleChangeType}
            label="Loan Type"
            size="small"
            onBlur={() => {
              if (type === "") {
                setTypeError(true);
                setTypeErrorText("Selection required");
              }
            }}
            error={typeError}
          >
            <MenuItem value="1">Internal</MenuItem>
          </Select>
          <FormHelperText sx={{ color: "#d11919" }}>
            {typeErrorText}
          </FormHelperText>
        </FormControl>
      );
    }
    return null;
  };
  console.log(company);
  console.log(customerCompany);
  console.log(companyErrorText);

  const ExternalOrInternal = () => {
    if (type === "1") {
      return (
        <FormControl sx={{ width: 200, marginLeft: 3 }}>
          <InputLabel>Customer Company</InputLabel>
          <Select
            id="outlined-basic"
            value={company}
            onChange={handleChangeCompany}
            size="small"
            label="Customer Company"
            onBlur={() => {
              if (company === "") {
                setCompanyError(true);
                setCompanyErrorText("Selection required");
              }
            }}
            error={companyError}
          >
            <MenuItem value="1">SERVO_LIVE</MenuItem>
            <MenuItem value="2">LEAPTRON_LIVE</MenuItem>
            <MenuItem value="3">DIRAK181025</MenuItem>
            <MenuItem value="4">PMC_LIVE</MenuItem>
            <MenuItem value="5">PORTWELL_LIVE</MenuItem>
            <MenuItem value="6">ALL</MenuItem>
          </Select>
          <FormHelperText sx={{ color: "#d11919" }}>
            {companyErrorText}
          </FormHelperText>
        </FormControl>
      );
    }
    if (type === "2") {
      return (
        <TextField
          id="outlined-basic"
          label="Customer Company"
          variant="outlined"
          size="small"
          name="customerCompany"
          sx={{ marginLeft: 3 }}
          onBlur={() => {
            if (customerCompany === "") {
              setCustomerCompanyError(true);
              setCustomerCompanyErrorText("Required");
            }
          }}
          onChange={(e) =>
            setCustomerCompany(e.target.value) || setCompany("100")
          }
          value={customerCompany}
          error={customerCompanyError}
          helperText={customerCompanyErrorText}
        />
      );
    }
    return (
      <FormControl sx={{ width: 200, marginLeft: 3 }}>
        <InputLabel>Customer Company</InputLabel>
        <Select
          disabled
          id="outlined-basic"
          value={company}
          onChange={handleChangeCompany}
          size="small"
          label="Customer Company"
          onBlur={() => {
            if (company === "") {
              setCompanyError(true);
              setCompanyErrorText("Selection required");
            }
          }}
          error={companyError}
        >
          <MenuItem value="1">SERVO_LIVE</MenuItem>
          <MenuItem value="2">LEAPTRON_LIVE</MenuItem>
          <MenuItem value="3">DIRAK181025</MenuItem>
          <MenuItem value="4">PMC_LIVE</MenuItem>
          <MenuItem value="5">PORTWELL_LIVE</MenuItem>
          <MenuItem value="6">ALL</MenuItem>
        </Select>
        <FormHelperText sx={{ color: "#d11919" }}>
          {companyErrorText}
        </FormHelperText>
      </FormControl>
    );
  };

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
                  onBlur={() => {
                    if (email === "") {
                      setEmailError(true);
                      setEmailErrorText("Required");
                    } else if (!email.match(emailRegex)) {
                      setEmailError(true);
                      setEmailErrorText("Invalid Email");
                    }
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  error={emailError}
                  helperText={emailErrorText}
                />
                {ExternalOrInternal()}
                <FormControl sx={{ width: 200, marginLeft: 3 }}>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    id="outlined-basic"
                    value={duration}
                    onChange={handleChangeDuration}
                    label="Duration"
                    size="small"
                    onBlur={() => {
                      if (duration === "") {
                        setDurationError(true);
                        setDurationErrorText("Selection required");
                      }
                    }}
                    error={durationError}
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
                  <FormHelperText sx={{ color: "#d11919" }}>
                    {durationErrorText}
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: 970, marginLeft: 2, marginTop: 2 }}
                  multiline
                  rows={4}
                  label="Purpose"
                  onBlur={() => {
                    if (purpose === "") {
                      setPurposeError(true);
                      setPurposeErrorText("Required");
                    }
                  }}
                  onChange={(e) => setPurpose(e.target.value)}
                  error={purposeError}
                  helperText={purposeErrorText}
                />
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
                    onBlur={() => {
                      if (collection === "") {
                        setCollectionError(true);
                        setCollectionErrorText("Selection required");
                      }
                    }}
                    error={collectionError}
                  >
                    {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                    <MenuItem value="Self-Collection">Self-Collection</MenuItem>
                    <MenuItem value="Delivery">Delivery</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: "#d11919" }}>
                    {collectionErrorText}
                  </FormHelperText>
                </FormControl>

                {/* Type */}
                {TLoanTypeAccess()}

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack>
                    <DesktopDatePicker
                      label="Required Date"
                      inputFormat="yyyy-MM-dd"
                      value={dateForm}
                      onClose={() => {
                        if (requireddate === "") {
                          setRDateError(true);
                          setRDateErrorText("Select a date");
                        }
                      }}
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
                  <LoadingButton
                    size="small"
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#063970",
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                      paddingRight: 4,
                    }}
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={() => navigate("/tloan")}
                  >
                    Back
                  </LoadingButton>
                </motion.div>
                <Box display="flex">
                  <motion.div
                    className="animatable"
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LoadingButton
                      size="small"
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#063970",
                        width: 200,
                        height: 50,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                      loading={loading}
                      loadingPosition="end"
                      endIcon={<SaveAsIcon />}
                      onClick={DraftLoan}
                    >
                      Save as Draft
                    </LoadingButton>
                  </motion.div>
                  <motion.div
                    className="animatable"
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LoadingButton
                      size="small"
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#31A961",
                        width: 200,
                        height: 50,
                        borderRadius: 10,
                      }}
                      loading={submitLoading}
                      loadingPosition="end"
                      endIcon={<DoneAllIcon />}
                      type="submit"
                      // onClick={submitLoan}
                    >
                      Submit
                    </LoadingButton>
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
