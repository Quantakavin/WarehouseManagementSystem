import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGridPro,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridFilterInputValueProps,
  GridRenderEditCellParams,
  useGridApiContext,
  GridColTypeDef,
  GRID_DATE_COL_DEF,
  GridFilterItem,
  GridCellParams,
} from "@mui/x-data-grid-pro";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from "@mui/x-data-grid-generator";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import locale from "date-fns/locale/en-US";
import { textAlign } from "@mui/system";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";

export default function CreateRMA() {
  const userrole = useAppSelector(selectRole);
  const [rma, setRma] = useState([]);
  const [rows, setRows] = useState([]);

  let { RmaID } = useParams();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const rma = await axios.get(`http://localhost:5000/api/RMA/${RmaID}`);

      setRma(rma.data);
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
      const rows = await axios.get(
        `http://localhost:5000/api/RMA/Product/${RmaID}`
      );

      setRows(rows.data);
      console.log(rows);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  // console.log(rma.data.RMAProducts)
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

  function GridEditDateCell({
    id,
    field,
    value,
  }: GridRenderEditCellParams<Date | string | null>) {
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
  }

  function GridFilterDateInput(
    props: GridFilterInputValueProps & { showTime?: boolean }
  ) {
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
  }

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

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

  const columns: GridColumns = [
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

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const companies = await axios
        .get(`http://localhost:5000/api/rmacompanies`)
        .then((companies) => setCompanies(companies.data));
      // setRma(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 3, height: "100%", width: "100%" }}>
      <Typography
        gutterBottom
        variant="subtitle2"
        component="Box"
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

      <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
        <Box sx={{ flexGrow: 1}}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locale}
          >
            <DataGridPro
              sx={{ background: "white", fontSize: 16 }}
              rows={rows}
              columns={columns}
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
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          size="small"
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#063970",
            width: 150,
            height: 40,
          }}
          onClick={() => navigate("/rma")}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#063970",
            width: 150,
            height: 40,
          }}
          onClick={() => navigate("/rma")}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

