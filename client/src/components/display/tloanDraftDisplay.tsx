import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { GetDetails }from "../../api/TLoanDB"
import FormHelperText from "@material-ui/core/FormHelperText";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { LoadingButton } from "@mui/lab";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumns,
  GridEventListener,
  GridRenderCellParams,
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
import dateFormat from "dateformat";
import { motion } from "framer-motion";
import React from "react";
import { useCart } from "react-use-cart";
import { Toast, Toast2 } from "../../components/alerts/SweetAlert";
import { EditableContext } from "../../components/context/isEditableContext";
import "../../pages/tloans/TLoanTable/table.css";

export default function TLoanDraftDisplay() {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  // const [loanDetails, setLoanDetails] = useState([]);
  const [loans, setLoans] = useState([]);
  const [itemLists, setItemLists] = useState([]);
  const { TLoanID } = useParams();
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
  const [dateForm, setDateForm] = useState("");
  const [typeError, setTypeError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [collectionError, setCollectionError] = useState(false);
  const [requireddateError, setRDateError] = useState(false);
  const [typeErrorText, setTypeErrorText] = useState("");
  const [companyErrorText, setCompanyErrorText] = useState("");
  const [purposeErrorText, setPurposeErrorText] = useState("");
  const [durationErrorText, setDurationErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [collectionErrorText, setCollectionErrorText] = useState("");
  const [rdateErrorText, setRDateErrorText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const context = useContext(EditableContext);
  const { isEditable, setIsEditable, TLoanIDGlobal, setTLoanIDGlobal } =
    context;

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const loans = await axios
        .get(`http://localhost:5000/api/tloans/${TLoanID}`)
        .then((data) => {
          setEmail(data.data.CustomerEmail);
          setPurpose(data.data.Purpose);
          setDuration(data.data.Duration);
          setCollection(data.data.Collection);
          setDateForm(data.data.RequiredDate);
          setCompany(data.data.CompanyID);
          setType(data.data.TLoanTypeID);
          setLoans(data.data);
        });

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
        `http://localhost:5000/api/tloanitems/${TLoanID}`
      );

      setItemLists(items.data);

      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  interface GridCellExpandProps {
    value: string;
    width: number;
  }

  function isOverflown(element: Element): boolean {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  const GridCellExpand = React.memo(function GridCellExpand(
    props: GridCellExpandProps
  ) {
    const { width, value } = props;
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current!);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };

    const handleMouseLeave = () => {
      setShowFullCell(false);
    };

    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }

      function handleKeyDown(nativeEvent: KeyboardEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          setShowFullCell(false);
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);

    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: "center",
          lineHeight: "24px",
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: "100%",
            width,
            display: "block",
            position: "absolute",
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
  });

  function renderCellExpand(params: GridRenderCellParams<string>) {
    return (
      <GridCellExpand
        value={params.value || ""}
        width={params.colDef.computedWidth}
      />
    );
  }

  const columns: GridColDef[] = [
    {
      field: "ItemNo",
      headerName: "Item Number",
      flex: 10,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "ItemName",
      headerName: "Item Name",
      flex: 10,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "BatchNo",
      headerName: "Batch Number",
      flex: 8,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "WarehouseCode",
      headerName: "WarehouseCode",
      flex: 8,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      flex: 0,
      editable: false,
      type: "number",
      renderCell: renderCellExpand,
    },
  ];
  const { addItem, emptyCart } = useCart();
  const newBasket = itemLists.map(
    ({ BasketItemID, ItemNo, ItemName, BatchNo, WarehouseCode, Quantity }) => ({
      id: BasketItemID,
      ItemNo: ItemNo,
      ItemName: ItemName,
      BatchNo: BatchNo,
      WarehouseCode: WarehouseCode,
      quantity: Quantity,
      price: 0,
    })
  );

  const itemStorage = localStorage.getItem("react-use-cart");
  const cartItems = JSON.parse(itemStorage).items;
  const addItemArray = () => {
    emptyCart();
    const addByIndex = () => {
      for (let i = 0; i < newBasket.length; i++) {
        addItem(newBasket[i], newBasket[i].quantity);
      }
      setIsEditable(!isEditable);
      setTLoanIDGlobal(TLoanID);
      Toast2.fire({
        icon: "info",
        title: "You are currently editing " + "" + "Loan #" + TLoanID,
        customClass: "swalpopup",
        width: 500,
      });
    };

    return (
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
          onClick={addByIndex}
        >
          Edit
        </Button>
      </motion.div>
    );
  };

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
                      <h2>TLoan {loans.TLoanID}</h2>
                      <Box sx={{ marginLeft: 5 }}>
                        <div>Loan No.</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.TLoanID}
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
                      rows={itemLists}
                      columns={columns}
                      editMode="row"
                      getRowId={(item) => item.ItemNo}
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      sx={{ display: "flex" }}
                      id="outlined-purpose"
                      multiline
                      rows={11.5}
                      label="Purpose"
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                      defaultValue={loans.Purpose}
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
                        <div>Collection Type:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.Collection}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div>Type:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.TLoanType}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{}}>Status:</div>
                        <div style={{ color: "green", fontWeight: "normal" }}>
                          {loans.TLoanStatus}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: 5 }}>
                        <div style={{}}>Extension:</div>
                        <div style={{ color: "black", fontWeight: "normal" }}>
                          {loans.TLoanExtensionStatus}
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
                          paddingRight: 4,
                        }}
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIosNewIcon />}
                      >
                        Back
                      </Button>
                    </motion.div>
                    {addItemArray()}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  };

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
  }

  const newProduct = cartItems.map(
    ({ id, ItemNo, ItemName, BatchNo, WarehouseCode, quantity }) => ({
      BasketItemID: id,
      ItemNo: ItemNo,
      ItemName: ItemName,
      BatchNo: BatchNo,
      WarehouseCode: WarehouseCode,
      Quantity: quantity,
      TLoanID: TLoanIDGlobal,
    })
  );

  const { updateItemQuantity, removeItem } = useCart();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  useEffect(() => {
    if (cartItems === []) {
      return console.log("Nothing in cart");
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
        headerName: "WarehouseCode",
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
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    );
  };

  useEffect(() => {
    setItems(newProduct);
  }, [newProduct]);

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
    if (
      items.length !== 0 &&
      type !== "" &&
      company !== "" &&
      purpose !== "" &&
      duration !== "" &&
      requireddate !== "" &&
      email !== "" &&
      email.match(emailRegex) &&
      collection !== ""
    ) {
      setTimeout(() => {
        try {
          const results = axios
            .put(
              `http://localhost:5000/api/tloan/submitEditedDraft/${TLoanID}`,
              {
                type,
                company,
                purpose,
                applicationdate,
                duration,
                requireddate,
                email,
                collection,
                items,
              }
            )
            .then(() => {
              Toast.fire({
                icon: "success",
                title: "TLoan Successfully Submitted",
                customClass: "swalpopup",
                timer: 1500,
                width: 700,
              });
              navigate("/tloan");
              setIsEditable(false);
              setTLoanIDGlobal(null);
            });
          emptyCart();
          console.log(results);
        } catch (error) {
          console.log(error.response);
          setSubmitLoading(false);
        }
      }, 500);
    }
  };

  const setInitial = () => {
    setIsEditable(false);
    setTLoanIDGlobal(null);
    Toast2.close();
    Toast.fire({
      icon: "warning",
      title: "You have Stopped editing " + "" + "Loan" + " " + "#" + TLoanID,
      customClass: "swalpopup",
      timer: 2000,
      width: 500,
    });
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
      setSubmitLoading(false);
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
            .put(
              `http://localhost:5000/api/tloan/draftEditedDraft/${TLoanID}`,
              {
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
              }
            )
            .then(() => {
              Toast.fire({
                icon: "info",
                title: "TLoan has been put into Draft",
                customClass: "swalpopup",
                timer: 1500,
                width: 700,
              });
              navigate("/tloan");
              setIsEditable(false);
              setTLoanIDGlobal(null);
            });
          emptyCart();
          console.log(results);
        } catch (error) {
          console.log(error.response);
          setSubmitLoading(false);
        }
      }, 500);
    }
  };
  useEffect(() => {
    var date = new Date().toISOString().split("T")[0];
    const uid = localStorage.getItem("user_id");
    setUser(uid);
    setADate(date);
    const Employee = localStorage.getItem("username");
    setName(Employee);
  });

  useEffect(() => {
    if (loans.CustomerEmail !== "") {
      (e) => setEmail(e.target.value);
    }
    if (loans.CompanyID !== "") {
      setCompany(loans.CompanyID);
    }
    if (loans.Duration !== null) {
      setCompany(loans.Duration);
    }
    if (loans.Purpose !== "") {
      setPurpose(loans.Purpose);
    }
    if (loans.Collection !== "") {
      setCollection(loans.Collection);
    }
    if (loans.TLoanType !== "") {
      setType(loans.TLoanType);
    }
    if (loans.StartDate !== "") {
      setRDate(loans.RequiredDate);
    }
  }, []);

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
            <h2>Edit Loan Draft</h2>
            {FullFeaturedCrudGrid()}
            {/* <form onSubmit={submitLoan} style={{ width: "100%" }}> */}
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
                // defaultValue={loans.CustomerEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailErrorText}
              />

              <FormControl sx={{ width: 200, marginLeft: 3 }}>
                <InputLabel>Customer Company</InputLabel>
                <Select
                  id="outlined-basic"
                  value={company}
                  onChange={handleChangeCompany}
                  size="small"
                  label="Customer Company"
                >
                  <MenuItem value={"1"}>SERVO_LIVE</MenuItem>
                  <MenuItem value={"2"}>LEAPTRON_LIVE</MenuItem>
                  <MenuItem value={"3"}>DIRAK181025</MenuItem>
                  <MenuItem value={"4"}>PMC_LIVE</MenuItem>
                  <MenuItem value={"5"}>PORTWELL_LIVE</MenuItem>
                  <MenuItem value={"6"}>ALL</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d11919" }}>
                  {companyErrorText}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ width: 200, marginLeft: 3 }}>
                <InputLabel>Duration</InputLabel>
                <Select
                  id="outlined-basic"
                  value={duration}
                  onChange={handleChangeDuration}
                  label="Duration"
                  size="small"
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
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                error={purposeError}
                helperText={purposeErrorText}
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
                >
                  <MenuItem value={"Self-Collection"}>Self-Collection</MenuItem>
                  <MenuItem value={"Delivery"}>Delivery</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d11919" }}>
                  {collectionErrorText}
                </FormHelperText>
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
                >
                  <MenuItem value={"1"}>Internal</MenuItem>
                  <MenuItem value={"2"}>External</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d11919" }}>
                  {typeErrorText}
                </FormHelperText>
              </FormControl>

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
                <Button
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
                  onClick={() => navigate(-1)}
                  startIcon={<ArrowBackIosNewIcon />}
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
                  <LoadingButton
                    size="small"
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#b30000",
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                    endIcon={<CancelIcon />}
                    onClick={() => setInitial()}
                  >
                    Cancel Edit
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
                      backgroundColor: "#063970",
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                    loading={loading}
                    loadingPosition="end"
                    onClick={DraftLoan}
                    endIcon={<SaveAsIcon />}
                  >
                    Save Draft
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
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                    }}
                    loading={submitLoading}
                    loadingPosition="end"
                    endIcon={<DoneAllIcon />}
                    onClick={submitLoan}
                    // onClick={submitLoan}
                  >
                    Submit
                  </LoadingButton>
                </motion.div>
              </Box>
            </Box>
            {/* </form> */}
          </CardContent>
        </Card>
      </div>
    );
  };
  // switch(isEditable){
  //     case false:
  //     return getData()

  //     case true:
  //         return getCard();
  // }
  return <>{isEditable ? getCard() : getData()}</>;
}
