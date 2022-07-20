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
    { field: "id", headerName: "PK", width: 50, editable: true },
    { field: "ItemCode", headerName: "Item Code", width: 150, editable: true },
    {
      field: "InvoiceNo",
      headerName: "Invoice Number",
      width: 150,
      editable: true,
    },
    { field: "DoNo", headerName: "D.O Number", width: 150, editable: true },
    {
      field: "DateOfPurchase",
      headerName: "Date Of Purchase",
      ...dateColumnType,
      width: 160,
      editable: true,
    },
    {
      field: "ReturnReason",
      headerName: "Reason For Return",
      width: 400,
      editable: true,
    },
    {
      field: "Instructions",
      headerName: "Instructions",
      width: 400,
      editable: true,
    },
    {
      field: "CourseOfAction",
      headerName: "Course Of Action",
      width: 400,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
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

  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState([]);

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
    <Card
      sx={{
        width: 1950,
        height: 700,
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardContent>
        <Grid container justifyContent="flex-end">
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginTop: 2,
                marginLeft: 0,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <h2>RMA Request #{rma.RmaID}</h2>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <div>EMPLOYEE</div>
                <div style={{ color: "black", fontWeight: "normal" }}>
                  {rma.Username}
                </div>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <div style={{}}>DATE APPLIED</div>
                <div style={{ color: "black", fontWeight: "normal" }}>
                  {rma.DateTime}
                </div>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <div style={{}}>CUSTOMER NAME</div>
                <div style={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactPerson}
                </div>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <div style={{}}>CUSTOMER EMAIL</div>
                <div style={{ color: "black", fontWeight: "normal" }}>
                  {rma.CustomerEmail}
                </div>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <div style={{}}>COMPANY</div>
                <div style={{ color: "black", fontWeight: "normal" }}>
                  {rma.CompanyName}
                </div>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <div style={{}}>CONTACT NUMBER</div>
                <div style={{ color: "black", fontWeight: "normal" }}>
                  {rma.ContactNo}
                </div>
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={locale}
            >
              <DataGridPro
                sx={{ height: 500 }}
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
          </Grid>
          <Grid item xs={6}>
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
              onClick={() => navigate("/rma")}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={6} justifyContent="right">
            <Button
              size="small"
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#063970",
                width: 150,
                height: 40,
                marginLeft: 98,
              }}
              onClick={() => navigate("/rma")}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
