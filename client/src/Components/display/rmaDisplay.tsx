import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MoreVert from "@mui/icons-material/MoreVert";
import SaveIcon from "@mui/icons-material/Save";
import { Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
  GridColTypeDef, GridEventListener,
  GridFilterInputValueProps,
  GridFilterItem,
  GridFilterModel,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GRID_DATE_COL_DEF,
  MuiEvent,
  useGridApiContext
} from "@mui/x-data-grid";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import locale from "date-fns/locale/en-US";
import { motion } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import ReasonModalButton from "./RmaModal/reasonModal";
import RejectModalButton from "./RmaModal/rejectModal";

const RmaDisplay: React.FC = () => {
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole);
  const [rma, setRma] = useState([]);
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = React.useState(25);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const { RmaID } = useParams();

  const rmabody = {
    products: rows,
  };

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      {
        columnField: "Company Name",
        operatorValue: "=",
        value: "SERVO_LIVE",
      },
    ],
  });
  // Get RMA details
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const rmadata = await axios.get(`http://localhost:5000/api/RMA/${RmaID}`);

      setRma(rmadata.data);
    };
    // call the function
    fetchData();
    // make sure to catch any error
  }, []);
  // Get RMA products
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const rowdata = await axios.get(
        `http://localhost:5000/api/RMA/Product/${RmaID}`
      );

      setRows(rowdata.data);
    };
    // call the function
    fetchData();
    // make sure to catch any error
  }, []);
  // Accept RMA
  const acceptRMA = async () => {
    axios
      .put(`http://localhost:5000/api/acceptRMA/${RmaID}`)
      .then(() => navigate("/rma"))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };
  // Update RMA checklist
  const updateChecklist = async () => {
    axios
      .put(`http://localhost:5000/api/updatechecklistRMA/${RmaID}`, rmabody)
      .then(() => navigate("/rma"))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };
  // Receive RMA
  const receiveRMA = async () => {
    axios
      .put(`http://localhost:5000/api/receiveRMA/${RmaID}`)
      .then(() => navigate("/rma"))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };
  // Verify RMA
  const verifyRMA = async () => {
    axios
      .put(`http://localhost:5000/api/verifyRMA/${RmaID}`, rmabody)
      .then(() => navigate("/rma"))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };
  // COA RMA
  const COARMA = async () => {
    axios
      .put(`http://localhost:5000/api/COARMA/${RmaID}`, rmabody)
      .then(() => navigate("/rma"))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };
  // Close RMA
  const closeRMA = async () => {
    axios
      .put(`http://localhost:5000/api/closeRMA/${RmaID}`)
      .then(() => navigate("/rma"))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };
  // const products = rma.RMAProducts;

  function buildApplyDateFilterFn(
    filterItem: GridFilterItem,
    compareFn: (value1: number, value2: number) => boolean,
    showTime: boolean = false
  ) {
    if (!filterItem.value) {
      return null;
    }

    const filterValueMs = filterItem.value.getTime();

    return ({ value }: GridCellParams<Date, any, any>): boolean => {
      if (!value) {
        return false;
      }

      // Make a copy of the date to not reset the hours in the original object
      const dateCopy = new Date(value);
      dateCopy.setHours(
        showTime ? value.getHours() : 0,
        showTime ? value.getMinutes() : 0,
        0,
        0
      );
      const cellValueMs = dateCopy.getTime();

      return compareFn(cellValueMs, filterValueMs);
    };
  }

  const GridFilterDateInput = (
    props: GridFilterInputValueProps & { showTime?: boolean }
  ) => {
    const { item, showTime, applyValue, apiRef } = props;

    const Component = showTime ? DateTimePicker : DatePicker;

    const handleFilterChange = (newValue: unknown) => {
      applyValue({ ...item, value: newValue });
    };

    return (
      <Component
        value={item.value || null}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={apiRef.current.getLocaleText("filterPanelInputLabel")}
          />
        )}
        InputAdornmentProps={{
          sx: {
            "& .MuiButtonBase-root": {
              marginRight: -1,
            },
          },
        }}
        onChange={handleFilterChange}
      />
    );
  };

  function getDateFilterOperators(
    showTime: boolean = false
  ): GridColTypeDef["filterOperators"] {
    return [
      {
        value: "is",
        getApplyFilterFn: (filterItem) => {
          return buildApplyDateFilterFn(
            filterItem,
            (value1, value2) => value1 === value2,
            showTime
          );
        },
        InputComponent: GridFilterDateInput,
        InputComponentProps: { showTime },
      },
      {
        value: "not",
        getApplyFilterFn: (filterItem) => {
          return buildApplyDateFilterFn(
            filterItem,
            (value1, value2) => value1 !== value2,
            showTime
          );
        },
        InputComponent: GridFilterDateInput,
        InputComponentProps: { showTime },
      },
      {
        value: "after",
        getApplyFilterFn: (filterItem) => {
          return buildApplyDateFilterFn(
            filterItem,
            (value1, value2) => value1 > value2,
            showTime
          );
        },
        InputComponent: GridFilterDateInput,
        InputComponentProps: { showTime },
      },
      {
        value: "onOrAfter",
        getApplyFilterFn: (filterItem) => {
          return buildApplyDateFilterFn(
            filterItem,
            (value1, value2) => value1 >= value2,
            showTime
          );
        },
        InputComponent: GridFilterDateInput,
        InputComponentProps: { showTime },
      },
      {
        value: "before",
        getApplyFilterFn: (filterItem) => {
          return buildApplyDateFilterFn(
            filterItem,
            (value1, value2) => value1 < value2,
            showTime
          );
        },
        InputComponent: GridFilterDateInput,
        InputComponentProps: { showTime },
      },
      {
        value: "onOrBefore",
        getApplyFilterFn: (filterItem) => {
          return buildApplyDateFilterFn(
            filterItem,
            (value1, value2) => value1 <= value2,
            showTime
          );
        },
        InputComponent: GridFilterDateInput,
        InputComponentProps: { showTime },
      },
      {
        value: "isEmpty",
        getApplyFilterFn: () => {
          return ({ value }): boolean => {
            return value == null;
          };
        },
        requiresFilterValue: false,
      },
      {
        value: "isNotEmpty",
        getApplyFilterFn: () => {
          return ({ value }): boolean => {
            return value != null;
          };
        },
        requiresFilterValue: false,
      },
    ];
  }

  const dateAdapter = new AdapterDateFns({ locale });

  const GridEditDateCell = ({
    id,
    field,
    value,
  }: GridRenderEditCellParams<Date | string | null>) => {
    const apiRef = useGridApiContext();

    const handleChange = (newValue: unknown) => {
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return (
      <DatePicker
        value={value}
        renderInput={(params) => <TextField {...params} />}
        onChange={handleChange}
        inputFormat="dd/MM/yy"
        views={["day", "month", "year"]}
      />
    );
  };
  const dateColumnType: GridColTypeDef<Date | string, string> = {
    ...GRID_DATE_COL_DEF,
    resizable: false,
    renderEditCell: (params) => {
      return <GridEditDateCell {...params} />;
    },
    filterOperators: getDateFilterOperators(),
    valueFormatter: (params) => {
      if (typeof params.value === "string") {
        return params.value;
      }
      if (params.value) {
        return dateAdapter.format(params.value, "keyboardDate");
      }
      return "";
    },
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
    props: GridCellExpandProps,
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
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);
  
    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: 'center',
          lineHeight: '24px',
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: '100%',
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
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
      <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
  }

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

  const markAsReceived = React.useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id
            ? { ...row, RmaProductStatus: !row.RmaProductStatus }
            : row
        )
      );
    },
    []
  );

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
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

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer
        sx={{ display: "flex", flexWrap: "wrap", maxWidth: 380, p: 1 }}
      >
        <Box>
          <GridToolbarQuickFilter sx={{ color: "#0A2540" }} debounceMs={1000} />
        </Box>
        <Box>
          <GridToolbarColumnsButton sx={{ color: "#0A2540" }} />
          <GridToolbarFilterButton sx={{ color: "#0A2540" }} />
          <GridToolbarDensitySelector sx={{ color: "#0A2540" }} />
          <GridToolbarExport sx={{ color: "#0A2540" }} />
        </Box>
      </GridToolbarContainer>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "PK", flex: 1, editable: true },
    { field: "ItemCode", headerName: "Item Code", flex: 2, editable: true },
    {
      field: "InvoiceNo",
      headerName: "Invoice Number",
      flex: 3,
      editable: true,
    },
    { field: "DoNo", headerName: "D.O Number", flex: 3, editable: true },
    {
      field: "DateOfPurchase",
      headerName: "Date Of Purchase",
      ...dateColumnType,
      flex: 3,
      editable: true,
    },
    {
      field: "ReturnReason",
      headerName: "Reason For Return",
      flex: 9,
      editable: true,
    },
    {
      field: "Instructions",
      headerName: "Instructions",
      flex: 9,
      editable: true,
    },
    {
      field: "CourseOfAction",
      headerName: "Course Of Action",
      flex: 9,
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
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

  const staticcolumns: GridColDef[] = [
    { field: "id", headerName: "PK", flex: 1, editable: false },
    { field: "ItemCode", headerName: "Item Code", flex: 2, editable: false },
    {
      field: "InvoiceNo",
      headerName: "Invoice Number",
      flex: 3,
      editable: false,
    },
    { field: "DoNo", headerName: "D.O Number", flex: 3, editable: false },
    {
      field: "DateOfPurchase",
      headerName: "Date Of Purchase",
      ...dateColumnType,
      flex: 3,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "ReturnReason",
      headerName: "Reason For Return",
      flex: 9,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "Instructions",
      headerName: "Instructions",
      flex: 9,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "CourseOfAction",
      headerName: "Course Of Action",
      flex: 9,
      editable: false,
      renderCell: renderCellExpand,
    },
  ];

  const whcolumns: GridColDef[] = [
    { field: "id", headerName: "PK", flex: 1, editable: false },
    { field: "ItemCode", headerName: "Item Code", flex: 2, editable: false },
    {
      field: "InvoiceNo",
      headerName: "Invoice Number",
      flex: 3,
      editable: false,
    },
    { field: "DoNo", headerName: "D.O Number", flex: 3, editable: false },
    {
      field: "DateOfPurchase",
      headerName: "Date Of Purchase",
      ...dateColumnType,
      flex: 5,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "ReturnReason",
      headerName: "Reason For Return",
      flex: 10,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "RmaProductStatus",
      headerName: "Status",
      type: "boolean",
      flex: 2,
      editable: false,
      cellClassName: "status--cell",
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
              icon={<BorderColorIcon />}
              label="Mark As Received"
              onClick={markAsReceived(id)}
            />,
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<MoreVert />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const icolumns: GridColDef[] = [
    { field: "id", headerName: "PK", flex: 1, editable: false },
    { field: "ItemCode", headerName: "Item Code", flex: 2, editable: false },
    {
      field: "InvoiceNo",
      headerName: "Invoice Number",
      flex: 3,
      editable: false,
    },
    { field: "DoNo", headerName: "D.O Number", flex: 3, editable: false },
    {
      field: "DateOfPurchase",
      headerName: "Date Of Purchase",
      ...dateColumnType,
      flex: 3,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "ReturnReason",
      headerName: "Reason For Return",
      flex: 9,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "Instructions",
      headerName: "Instructions",
      flex: 9,
      editable: true,
      cellClassName: "ins--cell",
      renderCell: renderCellExpand,
    },
    {
      field: "CourseOfAction",
      headerName: "Course Of Action",
      flex: 9,
      editable: false,
      renderCell: renderCellExpand,
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
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

  const coacolumns: GridColDef[] = [
    { field: "id", headerName: "PK", flex: 1, editable: false },
    { field: "ItemCode", headerName: "Item Code", flex: 2, editable: false },
    {
      field: "InvoiceNo",
      headerName: "Invoice Number",
      flex: 3,
      editable: false,
    },
    { field: "DoNo", headerName: "D.O Number", flex: 3, editable: false },
    {
      field: "DateOfPurchase",
      headerName: "Date Of Purchase",
      ...dateColumnType,
      flex: 3,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "ReturnReason",
      headerName: "Reason For Return",
      flex: 9,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "Instructions",
      headerName: "Instructions",
      flex: 9,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: "CourseOfAction",
      headerName: "Course Of Action",
      flex: 9,
      editable: true,
      cellClassName: "coa--cell",
      renderCell: renderCellExpand,
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
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

  if (rma.RmaStatusID === 3) {
    switch (userrole) {
      case "Sales Engineer": {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>Rejected</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.RmaStatusID}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <DataGrid
                  sx={{ background: "white", fontSize: 16 }}
                  rows={rows}
                  columns={staticcolumns}
                  editMode="row"
                  getRowId={(row) => row.id}
                  pageSize={pageSize}
                  onPageSizeChange={(newPage) => setPageSize(newPage)}
                  pagination
                  components={{
                    Toolbar: CustomToolbar,
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No approved RMA requests
                      </Stack>
                    ),
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                />
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
              <ReasonModalButton />
            </Box>
          </Box>
        );
      }
      case "Sales Manager": {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <DataGrid
                  sx={{ background: "white", fontSize: 16 }}
                  rows={rows}
                  columns={staticcolumns}
                  editMode="row"
                  getRowId={(row) => row.id}
                  rowModesModel={rowModesModel}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                />
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
            </Box>
          </Box>
        );
      }
      case "Warehouse Worker":
      case "Technical Staff":
      case "Sales Admin":
      case "Admin":
      default: {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={locale}
                >
                  <DataGrid
                    sx={{ background: "white", fontSize: 16 }}
                    rows={rows}
                    columns={staticcolumns}
                    editMode="row"
                    getRowId={(row) => row.id}
                    rowModesModel={rowModesModel}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
            </Box>
          </Box>
        );
      }
    }
  } else if (rma.RmaStatusID === 1) {
    switch (userrole) {
      case "Sales Manager": {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <DataGrid
                  sx={{ background: "white", fontSize: 16 }}
                  rows={rows}
                  columns={staticcolumns}
                  editMode="row"
                  getRowId={(row) => row.id}
                  pageSize={pageSize}
                  onPageSizeChange={(newPage) => setPageSize(newPage)}
                  pagination
                  components={{
                    Toolbar: CustomToolbar,
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No products
                      </Stack>
                    ),
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                />
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>

              <Box
                component="span"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
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
                      backgroundColor: "#31A961",
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    onClick={acceptRMA}
                  >
                    Accept
                  </Button>
                </motion.div>
                <RejectModalButton />
              </Box>
            </Box>
          </Box>
        );
      }
      case "Sales Engineer":
      case "Warehouse Worker":
      case "Technical Staff":
      case "Sales Admin": {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <DataGrid
                  sx={{ background: "white", fontSize: 16 }}
                  rows={rows}
                  columns={staticcolumns}
                  editMode="row"
                  getRowId={(row) => row.id}
                  pageSize={pageSize}
                  onPageSizeChange={(newPage) => setPageSize(newPage)}
                  pagination
                  components={{
                    Toolbar: CustomToolbar,
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No products
                      </Stack>
                    ),
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                />
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
            </Box>
          </Box>
        );
      }
      case "Admin":
      default: {
        return (
          <Box sx={{ padding: 3, height: "97%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "99%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={locale}
                >
                  <DataGrid
                    sx={{ background: "white", fontSize: 16 }}
                    rows={rows}
                    columns={staticcolumns}
                    editMode="row"
                    getRowId={(row) => row.id}
                    rowModesModel={rowModesModel}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    componentsProps={{
                      toolbar: { setRows, setRowModesModel },
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
              <Box
                component="span"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
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
                      backgroundColor: "#31A961",
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    onClick={acceptRMA}
                  >
                    Accept
                  </Button>
                </motion.div>
                <RejectModalButton />
              </Box>
            </Box>
          </Box>
        );
      }
    }
  } else if (rma.RmaStatusID === 7) {
    switch (userrole) {
      case "Sales Engineer":
      case "Sales Manager":
      case "Warehouse Worker":
      case "Technical Staff":
      case "Sales Admin":
      case "Admin":
      default: {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={locale}
                >
                  <DataGrid
                    sx={{ background: "white", fontSize: 16 }}
                    rows={rows}
                    columns={staticcolumns}
                    editMode="row"
                    getRowId={(row) => row.id}
                    rowModesModel={rowModesModel}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    // onRowEditStart={handleRowEditStart}
                    // onRowEditStop={handleRowEditStop}
                    // processRowUpdate={processRowUpdate}
                    // componentsProps={{
                    //   toolbar: { setRows, setRowModesModel },
                    // }}
                    // experimentalFeatures={{ newEditingApi: true }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
            </Box>
          </Box>
        );
      }
    }
  } else if (rma.RmaStatusID === 6) {
    switch (userrole) {
      case "Sales Admin": {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <DataGrid
                  sx={{ background: "white", fontSize: 16 }}
                  rows={rows}
                  columns={coacolumns}
                  editMode="row"
                  getRowId={(row) => row.id}
                  pageSize={pageSize}
                  onPageSizeChange={(newPage) => setPageSize(newPage)}
                  pagination
                  components={{
                    Toolbar: CustomToolbar,
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No products
                      </Stack>
                    ),
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                  rowModesModel={rowModesModel}
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  componentsProps={{
                    toolbar: { setRows, setRowModesModel },
                  }}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
              <Box
                component="span"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
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
                      backgroundColor: "#31A961",
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    onClick={COARMA}
                  >
                    Update
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
                      backgroundColor: "#D11A2A",
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                    }}
                    onClick={closeRMA}
                  >
                    Close
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Box>
        );
      }
      case "Sales Manager":
      case "Warehouse Worker":
      case "Technical Staff":
      case "Sales Engineer":
      case "Admin":
      default: {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={locale}
                >
                  <DataGrid
                    sx={{ background: "white", fontSize: 16 }}
                    rows={rows}
                    columns={staticcolumns}
                    editMode="row"
                    getRowId={(row) => row.id}
                    rowModesModel={rowModesModel}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    // onRowEditStart={handleRowEditStart}
                    // processRowUpdate={processRowUpdate}
                    // componentsProps={{
                    //   toolbar: { setRows, setRowModesModel },
                    // }}
                    // experimentalFeatures={{ newEditingApi: true }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
            </Box>
          </Box>
        );
      }
    }
  } else {
    switch (userrole) {
      case "Sales Engineer":
      case "Sales Manager": {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={locale}
                >
                  <DataGrid
                    sx={{ background: "white", fontSize: 16 }}
                    rows={rows}
                    columns={staticcolumns}
                    editMode="row"
                    getRowId={(row) => row.id}
                    rowModesModel={rowModesModel}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    // onRowEditStart={handleRowEditStart}
                    // onRowEditStop={handleRowEditStop}
                    // processRowUpdate={processRowUpdate}
                    // componentsProps={{
                    //   toolbar: { setRows, setRowModesModel },
                    // }}
                    // experimentalFeatures={{ newEditingApi: true }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
            </Box>
          </Box>
        );
      }
      case "Warehouse Worker": {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  "& .status--cell": {
                    backgroundColor: "#E6E6E6",
                    fontWeight: "600",
                  },
                }}
              >
                <DataGrid
                  sx={{ background: "white", fontSize: 16 }}
                  rows={rows}
                  columns={whcolumns}
                  editMode="row"
                  getRowId={(row) => row.id}
                  rowModesModel={rowModesModel}
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  componentsProps={{
                    toolbar: { setRows, setRowModesModel },
                  }}
                  experimentalFeatures={{ newEditingApi: true }}
                  pageSize={pageSize}
                  onPageSizeChange={(newPage) => setPageSize(newPage)}
                  pagination
                  components={{
                    Toolbar: CustomToolbar,
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No approved RMA requests
                      </Stack>
                    ),
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                />
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
              <Box
                component="span"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
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
                      marginRight: 5,
                    }}
                    onClick={updateChecklist}
                  >
                    Update
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
                    onClick={receiveRMA}
                  >
                    Complete
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Box>
        );
      }
      case "Technical Staff": {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  "& .ins--cell": {
                    backgroundColor: "#E6E6E6",
                    fontWeight: "600",
                  },
                }}
              >
                <DataGrid
                  sx={{ background: "white", fontSize: 16 }}
                  rows={rows}
                  columns={icolumns}
                  editMode="row"
                  getRowId={(row) => row.id}
                  pageSize={pageSize}
                  onPageSizeChange={(newPage) => setPageSize(newPage)}
                  pagination
                  components={{
                    Toolbar: CustomToolbar,
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No approved RMA requests
                      </Stack>
                    ),
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                  rowModesModel={rowModesModel}
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  componentsProps={{
                    toolbar: { setRows, setRowModesModel },
                  }}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
              <Box
                component="span"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
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
                      backgroundColor: "#31A961",
                      width: 150,
                      height: 50,
                      borderRadius: 10,
                    }}
                    onClick={verifyRMA}
                  >
                    Verify
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Box>
        );
      }
      case "Sales Admin": {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  "& .coa--cell": {
                    backgroundColor: "#E6E6E6",
                    fontWeight: "600",
                  },
                }}
              >
                <DataGrid
                  sx={{ background: "white", fontSize: 16 }}
                  rows={rows}
                  columns={coacolumns}
                  editMode="row"
                  getRowId={(row) => row.id}
                  pageSize={pageSize}
                  onPageSizeChange={(newPage) => setPageSize(newPage)}
                  pagination
                  components={{
                    Toolbar: CustomToolbar,
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No products
                      </Stack>
                    ),
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                  rowModesModel={rowModesModel}
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  componentsProps={{
                    toolbar: { setRows, setRowModesModel },
                  }}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
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
                  onClick={COARMA}
                >
                  Update
                </Button>
              </motion.div>
            </Box>
          </Box>
        );
      }
      case "Admin":
      default: {
        return (
          <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box>EMPLOYEE</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>DATE APPLIED</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER NAME</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CUSTOMER EMAIL</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>COMPANY</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </Box>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <Box sx={{}}>CONTACT NUMBER</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </Box>
              </Box>
            </Typography>

            <Box sx={{ display: "flex", height: "97%", width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <DataGrid
                  sx={{ background: "white", fontSize: 16 }}
                  rows={rows}
                  columns={staticcolumns}
                  editMode="row"
                  getRowId={(row) => row.id}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                />
              </Box>
            </Box>

            <Box
              component="span"
              paddingTop={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                  onClick={() => navigate("/rma")}
                >
                  Back
                </Button>
              </motion.div>
            </Box>
          </Box>
        );
      }
    }
  }
};

export default RmaDisplay;
