import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Card, CardContent, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { randomId } from "@mui/x-data-grid-generator";
import {
  DataGridPro,
  GridActionsCellItem,
  GridCellParams,
  GridColTypeDef,
  GridColumns,
  GridEventListener,
  GridFilterInputValueProps,
  GridFilterItem,
  GridRenderEditCellParams,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  GridToolbarContainer,
  GRID_DATE_COL_DEF,
  MuiEvent,
  useGridApiContext,
} from "@mui/x-data-grid-pro";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import locale from "date-fns/locale/en-US";
import { motion } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { selectId, selectRole } from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../alerts/SweetAlert";

const CreateRMA: React.FC = () => {
  const navigate = useNavigate();
  const sid = useAppSelector(selectId);
  const userrole = useAppSelector(selectRole);
  const [rows, setRows] = useState([]);
  const [contactperson, setContactperson] = useState("");
  const [contactno, setContactno] = useState("");
  const [contactemail, setContactemail] = useState("");
  const [company, setCompany] = useState("");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  useEffect(() => {
    if (userrole !== "Sales Engineer") {
      navigate("/403");
    }
  }, []);

  const dateAdapter = new AdapterDateFns({ locale });

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
        inputFormat="dd-MM-yyyy"
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

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
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
    { field: "ItemCode", headerName: "Item Code", width: 150, editable: true },
    {
      field: "InvoiceNo",
      headerName: "Invoice Number",
      width: 150,
      editable: true,
    },
    {
      field: "DoNo",
      headerName: "D.O Number",
      width: 150,
      editable: true,
      type: "number",
    },
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
      editable: false,
    },
    {
      field: "CourseOfAction",
      headerName: "Course Of Action",
      width: 400,
      editable: false,
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

  const EditToolbar = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [
        ...oldRows,
        {
          id,
          ItemCode: "",
          InvoiceNo: "",
          DoNo: "",
          ReturnReason: "",
          Instructions: "",
          CourseOfAction: "",
          isNew: true,
        },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "ItemCode" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  };

  const products = rows.map(({ id, isNew, ...rows }) => rows);
  const trimDate = products.map((product) => {
    const trimdate = new Date(product.DateOfPurchase);
    product.DateOfPurchase = ((trimdate.getMonth() > 8) ? (trimdate.getMonth() + 1) : ('0' + (trimdate.getMonth() + 1))) + '-' + ((trimdate.getDate() > 9) ? trimdate.getDate() : ('0' + trimdate.getDate())) + '-' + trimdate.getFullYear()
  });
  // console.log(products);

  const rmadetails = {
    contactperson,
    contactno,
    salesmanid: sid,
    contactemail,
    company,
    products,
  };

  const submitRMA = async () => {
    axios
      .post(`http://localhost:5000/api/newRMA`, rmadetails)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "RMA Successfully Submitted",
          customClass: "swalpopup",
          timer: 1500,
          width: 700,
        });
        navigate("/rma");
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };

  return (
    <Card
      sx={{
        width: "98%",
        height: "100%",
        m: 3,
      }}
    >
      <CardContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            marginBottom: 2,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <h2 style={{ marginLeft: 7, marginBottom: 20 }}>
            RMA Application Form
          </h2>
          <TextField
            value={contactperson}
            required
            id="filled-required"
            label="Customer Name"
            variant="filled"
            onChange={(e) => setContactperson(e.target.value)}
          />
          <TextField
            value={contactemail}
            required
            id="filled-required"
            label="Customer Email"
            variant="filled"
            onChange={(e) => setContactemail(e.target.value)}
          />
          <TextField
            value={company}
            required
            id="filled-required"
            label="Company"
            variant="filled"
            onChange={(e) => setCompany(e.target.value)}
          />
          <TextField
            value={contactno}
            required
            id="filled-required"
            label="Contact Number"
            variant="filled"
            onChange={(e) => setContactno(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locale}
          >
            <DataGridPro
              rows={rows}
              columns={columns}
              editMode="row"
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
          </LocalizationProvider>
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
              onClick={submitRMA}
            >
              Submit
            </Button>
          </motion.div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateRMA;
