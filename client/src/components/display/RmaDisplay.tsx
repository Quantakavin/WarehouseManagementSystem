// @ts-nocheck
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelIcon from "@mui/icons-material/Close";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditIcon from "@mui/icons-material/Edit";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MoreVert from "@mui/icons-material/MoreVert";
import SaveIcon from "@mui/icons-material/Save";
import UpdateIcon from "@mui/icons-material/Update";
import { LoadingButton } from "@mui/lab";
import {
  LinearProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
  GridColTypeDef,
  GridEventListener,
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
  useGridApiContext,
} from "@mui/x-data-grid";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import clsx from "clsx";
import locale from "date-fns/locale/en-US";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../../app/hooks";
import {
  selectPermissions,
  selectRole,
} from "../../app/reducers/CurrentUserSlice";
import config from "../../config/config";
import { RMA } from "../../utils/CommonTypes";
import { Toast } from "../alerts/SweetAlert";
import ReasonModalButton from "../modals/rmaReasonModal";
import RejectModalButton from "../modals/rmaRejectModal";

const RmaDisplay: React.FC = () => {
  const navigate = useNavigate();
  const permissions = useAppSelector(selectPermissions);
  const [rma, setRma] = useState<RMA>([]);
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [closeLoading, setCloseLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { RmaID } = useParams();
  const ApprovalPerms = permissions.some(
    (e) => e.FeatureName === "RMA Approval"
  );
  const ChecklistPerms = permissions.some(
    (e) => e.FeatureName === "RMA Checklist"
  );
  const VerificationPerms = permissions.some(
    (e) => e.FeatureName === "RMA Verification"
  );
  const UpdatePerms = permissions.some(
    (e) => e.FeatureName === "RMA Progress Update"
  );

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
    setTableLoading(true);
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const rmadata = await axios.get(`${config.baseURL}/RMA/${RmaID}`);
      console.log(`the data is ${JSON.stringify(rmadata.data)}`);

      setRma(rmadata.data);
    };
    // call the function
    console.log(`Approval permissions: ${ApprovalPerms}`);
    console.log(`Update permissions: ${UpdatePerms}`);
    console.log(`Checklist permissions: ${ChecklistPerms}`);
    console.log(`Verification permissions: ${VerificationPerms}`);
    fetchData();
    // make sure to catch any error
  }, [RmaID]);
  // Get RMA products
  useEffect(() => {
    setTableLoading(true);
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const rowdata = await axios.get(`${config.baseURL}/RMA/Product/${RmaID}`);

      setRows(rowdata.data);
      setTableLoading(false);
    };
    // call the function
    fetchData();
    // make sure to catch any error
  }, [RmaID]);
  // Accept RMA
  const acceptRMA = async () => {
    setLoading(true);
      axios
        .put(`${config.baseURL}/acceptRMA/${RmaID}`)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: `RMA #${rma.RmaID} Accepted`,
            customClass: "swalpopup",
            timer: 1500,
            width: 320,
          });
          navigate("/rma");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
  };
  // Update RMA checklist
  const updateChecklist = async () => {
    setLoading(true);
      axios
        .put(`${config.baseURL}/updatechecklistRMA/${RmaID}`, rmabody)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: `RMA #${rma.RmaID} Checklist Updated`,
            customClass: "swalpopup",
            timer: 1500,
            width: 380,
          });
          navigate("/rma");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
  };
  // Receive RMA
  const receiveRMA = async () => {
    setCompleteLoading(true);
      axios
        .put(`${config.baseURL}/receiveRMA/${RmaID}`)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: `RMA #${rma.RmaID} Received`,
            customClass: "swalpopup",
            timer: 1500,
            width: 310,
          });
          navigate("/rma");
        })
        .catch((error) => {
          console.log(error);
          setCompleteLoading(false);
        });
  };
  // Verify RMA
  const verifyRMA = async () => {
    setLoading(true);
      axios
        .put(`${config.baseURL}/verifyRMA/${RmaID}`, rmabody)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: `RMA #${rma.RmaID} Products Verified`,
            customClass: "swalpopup",
            timer: 1500,
            width: 370,
          });
          navigate("/rma");
        })
        .catch((error) => {
          console.log(error);
          Toast.fire({
            icon: "error",
            title: "Please enter instructions for each product!",
            customClass: "swalpopup",
            timer: 1500,
            width: 480,
          });
          setLoading(false);
        });
  };
  // COA RMA
  const COARMA = async () => {
    setLoading(true);
      axios
        .put(`${config.baseURL}/COARMA/${RmaID}`, rmabody)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: `RMA #${rma.RmaID} Progress Updated`,
            customClass: "swalpopup",
            timer: 1500,
            width: 380,
          });
          navigate("/rma");
        })
        .catch((error) => {
          console.log(error);
          Toast.fire({
            icon: "error",
            title: "Please update the COA for each product!",
            customClass: "swalpopup",
            timer: 1500,
            width: 460,
          });
          setLoading(false);
        });
  };
  // Close RMA
  const closeRMA = async () => {
    setCloseLoading(true);
      axios
        .put(`${config.baseURL}/closeRMA/${RmaID}`)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: `RMA #${rma.RmaID} Closed`,
            customClass: "swalpopup",
            timer: 1500,
            width: 300,
          });
          navigate("/rma");
        })
        .catch((error) => {
          console.log(error);
          setCloseLoading(false);
        });
  };

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
        value={value == null ? new Date() : value}
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

  // const columns: GridColDef[] = [
  //   { field: "id", headerName: "PK", flex: 1, editable: true },
  //   { field: "ItemCode", headerName: "Item Code", flex: 2, editable: true },
  //   {
  //     field: "InvoiceNo",
  //     headerName: "Invoice Number",
  //     flex: 3,
  //     editable: true,
  //   },
  //   { field: "DoNo", headerName: "D.O Number", flex: 3, editable: true },
  //   {
  //     field: "DateOfPurchase",
  //     headerName: "Date Of Purchase",
  //     ...dateColumnType,
  //     flex: 3,
  //     editable: true,
  //   },
  //   {
  //     field: "ReturnReason",
  //     headerName: "Reason For Return",
  //     flex: 9,
  //     editable: true,
  //   },
  //   {
  //     field: "Instructions",
  //     headerName: "Instructions",
  //     flex: 9,
  //     editable: true,
  //   },
  //   {
  //     field: "CourseOfAction",
  //     headerName: "Course Of Action",
  //     flex: 9,
  //     editable: true,
  //   },
  //   {
  //     field: "actions",
  //     type: "actions",
  //     headerName: "Actions",
  //     flex: 2,
  //     cellClassName: "actions",
  //     getActions: ({ id }) => {
  //       const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  //       if (isInEditMode) {
  //         return [
  //           <GridActionsCellItem
  //             icon={<SaveIcon />}
  //             label="Save"
  //             onClick={handleSaveClick(id)}
  //           />,
  //           <GridActionsCellItem
  //             icon={<CancelIcon />}
  //             label="Cancel"
  //             className="textPrimary"
  //             onClick={handleCancelClick(id)}
  //             color="inherit"
  //           />,
  //         ];
  //       }
  //       return [
  //         <GridActionsCellItem
  //           icon={<EditIcon />}
  //           label="Edit"
  //           className="textPrimary"
  //           onClick={handleEditClick(id)}
  //           color="inherit"
  //         />,
  //         <GridActionsCellItem
  //           icon={<DeleteIcon />}
  //           label="Delete"
  //           onClick={handleDeleteClick(id)}
  //           color="inherit"
  //         />,
  //       ];
  //     },
  //   },
  // ];

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
      cellClassName: (params: GridCellParams<boolean>) =>
        clsx("status-cell", {
          true: params.value == true,
          false: params.value == false,
        }),
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
            <Tooltip title="Mark As Received">
              <GridActionsCellItem
                icon={<BorderColorIcon />}
                label="Mark As Received"
                onClick={markAsReceived(id)}
              />
            </Tooltip>,
            <Tooltip title="Save">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
          ];
        }
        return [
          <Tooltip title="Edit">
            <GridActionsCellItem
              icon={<MoreVert />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          </Tooltip>,
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
            <Tooltip title="Save">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
            <Tooltip title="Cancel">
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />
            </Tooltip>,
          ];
        }
        return [
          <Tooltip title="Edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          </Tooltip>,
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
            <Tooltip title="Save">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
            <Tooltip title="Cancel">
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />
            </Tooltip>,
          ];
        }
        return [
          <Tooltip title="Edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          </Tooltip>,
        ];
      },
    },
  ];

  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Products</Box>
      </StyledGridOverlay>
    );
  }

  if (rma.RmaStatusID === 8) {
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
              {rma.Company}
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
                loading={loading}
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
                components={{
                  LoadingOverlay: LinearProgress,
                }}
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
              onClick={() => navigate("/rma")}
            >
              Back
            </LoadingButton>
          </motion.div>
        </Box>
      </Box>
    );
  }
  if (rma.RmaStatusID === 1) {
    if (ApprovalPerms === true) {
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
                {rma.Company}
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
                loading={tableLoading}
                sx={{ background: "white", fontSize: 16 }}
                rows={rows}
                columns={staticcolumns}
                editMode="row"
                getRowId={(row) => row.id}
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                pagination
                components={{
                  LoadingOverlay: LinearProgress,
                  Toolbar: CustomToolbar,
                  NoRowsOverlay: CustomNoRowsOverlay
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
                onClick={() => navigate("/rma")}
              >
                Back
              </LoadingButton>
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
                <LoadingButton
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
                  loadingPosition="end"
                  loading={loading}
                  endIcon={<DoneIcon />}
                  onClick={acceptRMA}
                >
                  Accept
                </LoadingButton>
              </motion.div>
              <RejectModalButton />
            </Box>
          </Box>
        </Box>
      );
    }
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
              {rma.Company}
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
                loading={tableLoading}
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
                components={{
                  LoadingOverlay: LinearProgress,
                }}
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
              onClick={() => navigate("/rma")}
            >
              Back
            </LoadingButton>
          </motion.div>
        </Box>
      </Box>
    );
  }
  if (rma.RmaStatusID === 7) {
    if (UpdatePerms === true) {
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
                {rma.Company}
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
                loading={tableLoading}
                sx={{ background: "white", fontSize: 16 }}
                rows={rows}
                columns={coacolumns}
                editMode="row"
                getRowId={(row) => row.id}
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                pagination
                components={{
                  LoadingOverlay: LinearProgress,
                  Toolbar: CustomToolbar,
                  NoRowsOverlay: CustomNoRowsOverlay
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
                onClick={() => navigate("/rma")}
              >
                Back
              </LoadingButton>
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
                <LoadingButton
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
                  loading={loading}
                  loadingPosition="end"
                  endIcon={<UpdateIcon />}
                  onClick={COARMA}
                >
                  Update
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
                    backgroundColor: "#D11A2A",
                    width: 150,
                    height: 50,
                    borderRadius: 10,
                  }}
                  loading={closeLoading}
                  loadingPosition="end"
                  endIcon={<DoDisturbIcon />}
                  onClick={closeRMA}
                >
                  Close
                </LoadingButton>
              </motion.div>
            </Box>
          </Box>
        </Box>
      );
    }
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
              {rma.Company}
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
                loading={tableLoading}
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
                components={{
                  LoadingOverlay: LinearProgress,
                }}
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
              onClick={() => navigate("/rma")}
            >
              Back
            </LoadingButton>
          </motion.div>
        </Box>
      </Box>
    );
  }
  if (rma.RmaStatusID === 4) {
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
              {rma.Company}
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
                loading={tableLoading}
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
                components={{
                  LoadingOverlay: LinearProgress,
                }}
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
              onClick={() => navigate("/rma")}
            >
              Back
            </LoadingButton>
          </motion.div>
          <ReasonModalButton />
        </Box>
      </Box>
    );
  }
  if (ChecklistPerms === true) {
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
              {rma.Company}
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
              "& .status-cell.true": {
                backgroundColor: "rgba(49, 169, 97, 0.5)",
                fontWeight: "600",
              },
              "& .status-cell.false": {
                backgroundColor: "rgba(209, 26, 42, 0.5)",
                fontWeight: "600",
              },
            }}
          >
            <DataGrid
              loading={tableLoading}
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
                LoadingOverlay: LinearProgress,
                Toolbar: CustomToolbar,
                NoRowsOverlay: CustomNoRowsOverlay
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
              onClick={() => navigate("/rma")}
            >
              Back
            </LoadingButton>
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
              <LoadingButton
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
                loading={loading}
                loadingPosition="end"
                endIcon={<UpdateIcon />}
                onClick={updateChecklist}
              >
                Update
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
                loading={completeLoading}
                loadingPosition="end"
                endIcon={<FactCheckIcon />}
                onClick={receiveRMA}
              >
                Complete
              </LoadingButton>
            </motion.div>
          </Box>
        </Box>
      </Box>
    );
  }
  if (VerificationPerms === true) {
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
              {rma.Company}
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
              loading={tableLoading}
              sx={{ background: "white", fontSize: 16 }}
              rows={rows}
              columns={icolumns}
              editMode="row"
              getRowId={(row) => row.id}
              pageSize={pageSize}
              onPageSizeChange={(newPage) => setPageSize(newPage)}
              pagination
              components={{
                LoadingOverlay: LinearProgress,
                Toolbar: CustomToolbar,
                NoRowsOverlay: CustomNoRowsOverlay
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
              onClick={() => navigate("/rma")}
            >
              Back
            </LoadingButton>
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
                loading={loading}
                loadingPosition="end"
                endIcon={<DoneAllIcon />}
                onClick={verifyRMA}
              >
                Verify
              </LoadingButton>
            </motion.div>
          </Box>
        </Box>
      </Box>
    );
  }
  if (UpdatePerms === true) {
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
              {rma.Company}
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
              loading={tableLoading}
              sx={{ background: "white", fontSize: 16 }}
              rows={rows}
              columns={coacolumns}
              editMode="row"
              getRowId={(row) => row.id}
              pageSize={pageSize}
              onPageSizeChange={(newPage) => setPageSize(newPage)}
              pagination
              components={{
                LoadingOverlay: LinearProgress,
                Toolbar: CustomToolbar,
                NoRowsOverlay: CustomNoRowsOverlay
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
              onClick={() => navigate("/rma")}
            >
              Back
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
              loading={loading}
              loadingPosition="end"
              endIcon={<UpdateIcon />}
              onClick={COARMA}
            >
              Update
            </LoadingButton>
          </motion.div>
        </Box>
      </Box>
    );
  }
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
          <Box sx={{ color: "black", fontWeight: "normal" }}>{rma.Company}</Box>
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
            loading={tableLoading}
            sx={{ background: "white", fontSize: 16 }}
            rows={rows}
            columns={staticcolumns}
            editMode="row"
            getRowId={(row) => row.id}
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) =>
              setFilterModel(newFilterModel)
            }
            components={{
              LoadingOverlay: LinearProgress,
            }}
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
            onClick={() => navigate("/rma")}
          >
            Back
          </LoadingButton>
        </motion.div>
      </Box>
    </Box>
  );
};

export default RmaDisplay;
