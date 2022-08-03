import FormHelperText from "@material-ui/core/FormHelperText";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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
import axios from "axios";
import dateFormat from "dateformat";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useAppSelector } from "../../app/hooks";
import { selectPermissions } from "../../app/reducers/CurrentUserSlice";
import { Toast, Toast2 } from "../alerts/SweetAlert";
import { EditableContext } from "../context/isEditableContext";
import ModalButton from "../modals/tloanExtensionModal";
import TLoanRejectModalButton from "../modals/tloanRejectModal";

export default function tloanDisplay() {
  const permissions = useAppSelector(selectPermissions);
  const navigate = useNavigate();
  const [loans, setLoans] = useState<TLoan>([]);
  const [itemsTable, setItemsTable] = useState([]);
  const [purposeField, setPurposeField] = useState("");
  const context = useContext(EditableContext);
  const { isEditable, setIsEditable, TLoanIDGlobal, setTLoanIDGlobal } =
    context;
  const { TLoanID } = useParams();
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
  const [reasonField, setReasonField] = useState("");
  const [statusChange, setStatusChange] = useState("")
  const [statusChangeError, setStatusChangeError] = useState(false)
  const [statusChangeErrorText, setStatusChangeErrorText] = useState("")

  const ApprovalLoanPerms = permissions.some(
    (e) => e.FeatureName === "T-Loan Approval"
  );
  const ExternalApplicationPerms = permissions.some(
    (e) => e.FeatureName === "T-Loan Application (Internal+External)"
  );
  const InternalApplicationPerms = permissions.some(
    (e) => e.FeatureName === "T-Loan Application (Internal)"
  );
  const AdminViewPerms = permissions.some(
    (e) => e.FeatureName === "T-Loan Admin (View)"
  );
  const WarehouseViewPerms = permissions.some(
    (e) => e.FeatureName === "T-Loan Warehouse (View)"
  );

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const loans = await axios
        .get(`http://localhost:5000/api/tloans/${TLoanID}`)
        .then((data) => {
          setPurposeField(data.data.Purpose);
          setReasonField(data.data.Reason);
          setEmail(data.data.CustomerEmail);
          setPurpose(data.data.Purpose);
          setDuration(data.data.Duration);
          setCollection(data.data.Collection);
          setDateForm(data.data.RequiredDate);
          setType(data.data.TLoanTypeID);
          setLoans(data.data);
          setCompany( data.data.CompanyID ||data.data.CompanyName )
        });
    };
    fetchData().catch(console.error);
  }, []);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const items = await axios.get(
        `http://localhost:5000/api/tloanitems/${TLoanID}`
      );
      setItemsTable(items.data);
    };
    fetchData().catch(console.error);
  }, []);
 
  const updateStatus = (e) =>{
    setLoading(false)
    setStatusChangeError(false)
    if(statusChange === ""){
      setStatusChangeError(true)
      setStatusChangeErrorText("Please Select A Status")
    }
    if(statusChange !== ""){
      setTimeout(()=>{
        try{
          const results= axios
          .put(
            `http://localhost:5000/api/tloan/updatestatus/${TLoanID}`,{
              statusChange,
            })
            .then(() => {
              Toast.fire({
                icon: "success",
                title: "Status Successfully Updated",
                customClass: "swalpopup",
                timer: 1500,
                width: 700,
              });
              window.location.reload()
              
             console.log(results)
            });
          }catch (error) {
            console.log(error.response);
            setLoading(false);
          }
      },500)
    }
  
  }
      // get the data from the api
      
     

  const TLoanTypeAccess = () =>{
    if(ExternalApplicationPerms === true){
      return(
      <FormControl sx={{ width: 200, marginLeft: 3 }}>
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
        <MenuItem value={"1"}>Internal</MenuItem>
        <MenuItem value={"2"}>External</MenuItem>
      </Select>
      <FormHelperText sx={{ color: "#d11919" }}>
        {typeErrorText}
      </FormHelperText>
    </FormControl>
    )
    }else if(InternalApplicationPerms === true){
      return(
        <FormControl sx={{ width: 200, marginLeft: 3, }}>
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
          <MenuItem value={"1"}>Internal</MenuItem>
        </Select>
        <FormHelperText sx={{ color: "#d11919" }}>
          {typeErrorText}
        </FormHelperText>
      </FormControl>
      )
    }else return null
   }
  
   const ExternalOrInternal =()=>{
    if(type ===  "1"  || type === 1){
      return (
        <FormControl sx={{ width: 200, marginLeft: 3 }}>
        <InputLabel>Company</InputLabel>
        <Select
          id="outlined-basic"
          value={company}
          onChange={handleChangeCompany}
          size="small"
          label="Company"
          onBlur={() => {
            if (company === "") {
              setCompanyError(true);
              setCompanyErrorText("Selection required");
            }
          }}
          error={companyError}
        >
          <MenuItem value={"1"}>SERVO_LIVE</MenuItem>
          <MenuItem value={"2"}>LEAPTRON_LIVE</MenuItem>
          <MenuItem value={"3"}>DIRAK181025</MenuItem>
          <MenuItem value={"4"}>PMC_LIVE</MenuItem>
          <MenuItem value={"5"}>PORTWELL_LIVE</MenuItem>
          <MenuItem value={"6"} >ALL</MenuItem>
        </Select>
        <FormHelperText sx={{ color: "#d11919" }}>
          {companyErrorText}
        </FormHelperText>
      </FormControl>
      )
    }else if(type === "2" || type === 2 ){
      return(
        <TextField
        id="outlined-basic"
        label="Customer Company"
        variant="outlined"
        size="small"
        name="customer Company"
        sx={{ marginLeft: 3 }}
        onBlur={() => {
          if (company === "" ) {
            setCompanyError(true);
            setCompanyErrorText("Required");
          }
        }}
        onChange={(e) => 
          setCompany(e.target.value)
        }
        value={company}
        error={companyError}
        helperText={companyErrorText}
      />
  
      )
    }
   }
  const itemStorage = localStorage.getItem("react-use-cart");
  const cartItems = JSON.parse(itemStorage).items;

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

  const { addItem, emptyCart, updateItemQuantity, removeItem } = useCart();
  const newBasket = itemsTable.map(
    ({ BasketItemID, ItemNo, ItemName, BatchNo, WarehouseCode, Quantity }) => ({
      id: BasketItemID,
      ItemNo,
      ItemName,
      BatchNo,
      WarehouseCode,
      quantity: Quantity,
      price: 0,
    })
  );
  const newProduct = cartItems.map(
    ({ id, ItemNo, ItemName, BatchNo, WarehouseCode, quantity }) => ({
      BasketItemID: id,
      ItemNo,
      ItemName,
      BatchNo,
      WarehouseCode,
      Quantity: quantity,
      TLoanID: TLoanIDGlobal,
    })
  );

  useEffect(() => {
    setItems(newProduct);
  }, [newProduct]);
  useEffect(() => {
    const correctFormat = dateFormat(dateForm, "yyyy-mm-dd");
    setRDate(correctFormat);
  }, [dateForm]);

  const setInitial = () => {
    setIsEditable(false);
    setTLoanIDGlobal(null);
    Toast2.close();
    Toast.fire({
      icon: "warning",
      title: `You have Stopped editing ` + `` + `Loan` + ` ` + `#${TLoanID}`,
      customClass: "swalpopup",
      timer: 2000,
      width: 500,
    });
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
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
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

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusChange(event.target.value);
  };
  const handleChangeRequiredDate = (newValue: "" | null) => {
    setDateForm(newValue);
  };

  const emailRegex = /^\S+@\S+\.\S+$/i;

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
        title: `You are currently editing ` + `` + `Loan #${TLoanID}`,
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
        <LoadingButton
          size="small"
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#063970",
            width: 150,
            height: 50,
            borderRadius: 10,
          }}
          onClick={addByIndex}
          endIcon={<EditIcon />}
        >
          Edit
        </LoadingButton>
      </motion.div>
    );
  };

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
    if (type === "2" && (company === "1" || company === "2" ||company === "3" ||company === "4" ||company === "5" ||company === "6")){
      setCompanyError(true);
      setCompanyErrorText("Valid Input Required");
      setSubmitLoading(false);
    }
    if (type === "1" && (company !== "1" && company !== "2" && company !== "3" && company !== "4" && company !== "5" && company !== "6")){
      setCompanyError(true);
      setCompanyErrorText("Input Required");
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
              emptyCart();
              setIsEditable(false);
              setTLoanIDGlobal(null);
            });
         
          console.log(results);
        } catch (error) {
          console.log(error.response);
          setSubmitLoading(false);
        }
      }, 500);
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
    if (type === "2" && (company === "1" || company === "2" ||company === "3" ||company === "4" ||company === "5" ||company === "6")){
      setCompanyError(true);
      setCompanyErrorText("Valid Input Required");
      setSubmitLoading(false);
    }
    if (type === "1" && (company !== "1" && company !== "2" && company !== "3" && company !== "4" && company !== "5" && company !== "6")){
      setCompanyError(true);
      setCompanyErrorText("Input Required");
      setSubmitLoading(false);
    }
    if ( items.length !== 0 && company !== "" && email !== "" && email.match(emailRegex)) {
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
              emptyCart();
            });
         
          console.log(results);
        } catch (error) {
          console.log(error.response);
          setSubmitLoading(false);
        }
      }, 500);
    }
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
                      rows={itemsTable}
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
                      variant="outlined"
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
                {TLoanTypeAccess()}
                {ExternalOrInternal()}

             
             
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
                >
                  <MenuItem value="Self-Collection">Self-Collection</MenuItem>
                  <MenuItem value="Delivery">Delivery</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d11919" }}>
                  {collectionErrorText}
                </FormHelperText>
              </FormControl>

              {/* Type */}
              <FormControl sx={{ width: 200, marginLeft: 3, marginTop: 2 }}>
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
  const ApproveLoan = async () => {
    axios
      .put(`http://localhost:5000/api/tloan/approve/${TLoanID}`)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: `Request For TLoan ` + `#${TLoanID} Has Been Approved`,
          customClass: "swalpopup",
          timer: 2000,
          width: 700,
        });
        navigate("/tloan");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
 

  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
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
    if (loans.CompanyName !== "") {
      setCompany(loans.CompanyName);
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
  console.log(loans.TLoanExtensionStatusID);
  if (
    loans.TLoanStatusID === 3 ||
    loans.TLoanStatusID === 5 ||
    loans.TLoanStatusID === 6 ||
    loans.TLoanStatusID === 7
  ) {
    if (InternalApplicationPerms == true || ExternalApplicationPerms == true) {
      return (
        <Box
          sx={{ padding: 3, paddingBottom: 0, height: "100%", width: "100%" }}
        >
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
                        rows={itemsTable}
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
                        value={purposeField}
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
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 },
                        }}
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
                      <ModalButton />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      );
    }
    if (AdminViewPerms == true) {
      return (
        <Box
          sx={{ padding: 3, paddingBottom: 0, height: "100%", width: "100%" }}
        >
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
                        rows={itemsTable}
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
                        value={purposeField}
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
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 },
                        }}
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
                          onClick={() => navigate(-1)}
                        >
                          Back
                        </LoadingButton>
                      </motion.div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      );
    }
    if (WarehouseViewPerms == true) {
      return (
        <Box
          sx={{ padding: 3, paddingBottom: 0, height: "100%", width: "100%" }}
        >
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
                    <Grid item xs={12} >
                    <DataGrid
                        sx={{ background: "white", fontSize: 16, height:300 }}
                        rows={itemsTable}
                        columns={columns}
                        editMode="row"
                        getRowId={(item) => item.ItemNo}
                        experimentalFeatures={{ newEditingApi: true }}/>
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
                          <div style={{ color: "black", fontWeight: "normal" }}>
                            {loans.TLoanStatus}
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
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 },
                        }}
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
                      <FormControl sx={{ width: 200}}>
                        <InputLabel>TLoan Status</InputLabel>
                        <Select
                          id="outlined-basic"
                          value={statusChange}
                          onChange={handleChangeStatus}
                          label="update Status"
                          size="big"
                        >
                          <MenuItem value={"5"}>Picking</MenuItem>
                          <MenuItem value={"6"}>Ready</MenuItem>
                          <MenuItem value={"7"}>Issued</MenuItem>
                        </Select>
                        <FormHelperText sx={{ color: "#d11919" }}>
                          {statusChangeErrorText}
                        </FormHelperText>
                      </FormControl>
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
                            marginLeft: 5,
                            marginRight: 2
                          }}
                          loading={submitLoading}
                          loadingPosition="end"
                          endIcon={<DoneAllIcon />}
                          onClick={updateStatus}
                          // onClick={submitLoan}
                        >
                          Update Status
                        </LoadingButton>
                      </motion.div>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      );
    }
  } else if (loans.TLoanStatusID === 4) {
    if (ApprovalLoanPerms == true) {
      return (
        <Box
          sx={{ padding: 3, paddingBottom: 0, height: "100%", width: "100%" }}
        >
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
                        rows={itemsTable}
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
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Purpose"
                        variant="filled"
                        value={purposeField}
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
                          <div style={{ color: "black", fontWeight: "normal" }}>
                            {loans.TLoanStatus}
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
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 },
                        }}
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
                      <Box sx={{ float: "right", display: "flex" }}>
                        <motion.div
                          className="animatable"
                          whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.3 },
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <LoadingButton
                            size="small"
                            variant="contained"
                            sx={{
                              color: "white",
                              backgroundColor: "green",
                              width: 200,
                              height: 50,
                              borderRadius: 10,
                              marginRight: 5,
                              marginLeft: 4,
                            }}
                            endIcon={<DoneIcon />}
                            onClick={ApproveLoan}
                          >
                            Approve
                          </LoadingButton>
                        </motion.div>
                        <TLoanRejectModalButton />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      );
    }
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
                      rows={itemsTable}
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
                      value={purposeField}
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
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 },
                      }}
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
                        onClick={() => navigate(-1)}
                      >
                        Back
                      </LoadingButton>
                    </motion.div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  } else if (loans.TLoanStatusID === 1) {
    if (InternalApplicationPerms == true || ExternalApplicationPerms == true) {
      return <>{isEditable ? getCard() : getData()}</>;
    }
  } else if (loans.TLoanStatusID === 8) {
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
                      rows={itemsTable}
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
                      value={purposeField}
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
                        onClick={() => navigate(-1)}
                      >
                        Back
                      </LoadingButton>
                    </motion.div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  } else return null;
}
