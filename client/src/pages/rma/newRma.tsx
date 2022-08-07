import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  Stack,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColTypeDef,
  GridColumns,
  GridEditInputCell,
  GridEventListener,
  GridFilterInputValueProps,
  GridFilterItem,
  GridPreProcessEditCellProps,
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
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import locale from "date-fns/locale/en-US";
import { motion, useAnimation } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import {
  selectId,
  selectPermissions,
  selectRole,
} from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../../components/alerts/SweetAlert";
import config from "../../config/config";

const CreateRMA: React.FC = () => {
  const navigate = useNavigate();
  const sid = useAppSelector(selectId);
  const userrole = useAppSelector(selectRole);
  const permissions = useAppSelector(selectPermissions);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [contactperson, setContactperson] = useState("");
  const [contactno, setContactno] = useState("");
  const [contactemail, setContactemail] = useState("");
  const [company, setCompany] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [compError, setCompError] = useState(false);
  const [numError, setNumError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [compErrorText, setCompErrorText] = useState("");
  const [numErrorText, setNumErrorText] = useState("");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const phoneRegex =
    /^[6|8|9]\d{7}|\+65\s?[6|8|9]\d{7}|\(\+?65\)\s?[6|8|9]\d{7}$/i;
  const emailRegex = /^\S+@\S+\.\S+$/i;
  const controls = useAnimation();
  const variants = {
    detecterror: () => ({
      // rotate: [-1, 1.3, 0],
      x: [10, -10, 0, 10, -10, 0],
      transition: {
        duration: 0.4,
      },
    }),
  };

  useEffect(() => {
    if (!permissions.some((e) => e.FeatureName === "RMA Application")) {
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

  let promiseTimeout: any;
  function validateItemCode(ItemCode: string): Promise<boolean> {
    return new Promise<any>((resolve) => {
      promiseTimeout = setTimeout(() => {
        const exists = ItemCode === "";
        resolve(exists ? `Required` : null);
      }); // simulate network latency
    });
  }

  function validateInvNo(InvoiceNo: string): Promise<boolean> {
    return new Promise<any>((resolve) => {
      promiseTimeout = setTimeout(() => {
        const exists = InvoiceNo === "";
        resolve(exists ? `Required` : null);
      }); // simulate network latency
    });
  }

  function validateDoNo(DoNo: string): Promise<boolean> {
    return new Promise<any>((resolve) => {
      promiseTimeout = setTimeout(() => {
        const exists = DoNo === "";
        resolve(exists ? `Required` : null);
      }); // simulate network latency
    });
  }

  function validateDOP(DateOfPurchase: string): Promise<boolean> {
    return new Promise<any>((resolve) => {
      promiseTimeout = setTimeout(() => {
        const exists = DateOfPurchase === "";
        resolve(exists ? `Please enter an Date of Purchase` : null);
      }); // simulate network latency
    });
  }

  function validateROR(ReturnReason: string): Promise<boolean> {
    return new Promise<any>((resolve) => {
      promiseTimeout = setTimeout(() => {
        const exists = ReturnReason === "";
        resolve(exists ? `Required` : null);
      }); // simulate network latency
    });
  }

  const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },
  }));

  const ItemCodeEditInputCell = (props: GridRenderEditCellParams) => {
    const { itemcodeerror } = props;

    return (
      <StyledTooltip open={!!itemcodeerror} title={itemcodeerror}>
        <GridEditInputCell {...props} />
      </StyledTooltip>
    );
  };

  function renderEditItemCode(params: GridRenderEditCellParams) {
    return <ItemCodeEditInputCell {...params} />;
  }

  const InvNoEditInputCell = (props: GridRenderEditCellParams) => {
    const { invnoerror } = props;

    return (
      <StyledTooltip open={!!invnoerror} title={invnoerror}>
        <GridEditInputCell {...props} />
      </StyledTooltip>
    );
  };

  function renderEditInvNo(params: GridRenderEditCellParams) {
    return <InvNoEditInputCell {...params} />;
  }

  const DoNoEditInputCell = (props: GridRenderEditCellParams) => {
    const { donoerror } = props;

    return (
      <StyledTooltip open={!!donoerror} title={donoerror}>
        <GridEditInputCell {...props} />
      </StyledTooltip>
    );
  };

  function renderEditDoNo(params: GridRenderEditCellParams) {
    return <DoNoEditInputCell {...params} />;
  }

  const ROREditInputCell = (props: GridRenderEditCellParams) => {
    const { rorerror } = props;

    return (
      <StyledTooltip open={!!rorerror} title={rorerror}>
        <GridEditInputCell {...props} />
      </StyledTooltip>
    );
  };

  function renderEditROR(params: GridRenderEditCellParams) {
    return <ROREditInputCell {...params} />;
  }

  const preProcessEditCellProps = async (
    params: GridPreProcessEditCellProps
  ) => {
    const errorMessageItemCode = await validateItemCode(
      params.props.value!.toString()
    );
    const errorMessageInvNo = await validateInvNo(
      params.props.value!.toString()
    );
    const errorMessageDoNo = await validateDoNo(params.props.value!.toString());
    const errorMessageDOP = await validateDOP(params.props.value!.toString());
    const errorMessageROR = await validateROR(params.props.value!.toString());
    return {
      ...params.props,
      itemcodeerror: errorMessageItemCode,
      invnoerror: errorMessageInvNo,
      donoerror: errorMessageDoNo,
      doperror: errorMessageDOP,
      rorerror: errorMessageROR,
    };
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(promiseTimeout);
    };
  }, []);

  const columns: GridColumns = [
    {
      field: "ItemCode",
      headerName: "Item Code",
      flex: 2,
      editable: true,
      preProcessEditCellProps,
      renderEditCell: renderEditItemCode,
    },
    {
      field: "InvoiceNo",
      headerName: "Invoice Number",
      flex: 2,
      editable: true,
      preProcessEditCellProps,
      renderEditCell: renderEditInvNo,
    },
    {
      field: "DoNo",
      headerName: "D.O Number",
      flex: 2,
      editable: true,
      type: "number",
      preProcessEditCellProps,
      renderEditCell: renderEditDoNo,
    },
    {
      field: "DateOfPurchase",
      headerName: "Date Of Purchase",
      ...dateColumnType,
      flex: 2,
      editable: true,
    },
    {
      field: "ReturnReason",
      headerName: "Reason For Return",
      flex: 20,
      editable: true,
      preProcessEditCellProps,
      renderEditCell: renderEditROR,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
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
          Add Product
        </Button>
      </GridToolbarContainer>
    );
  };

  const products = rows.map(({ id, isNew, ...rows }) => rows);
  const trimDate = products.map((product) => {
    const trimdate = new Date(product.DateOfPurchase);
    product.DateOfPurchase = `${
      trimdate.getMonth() > 8
        ? trimdate.getMonth() + 1
        : `0${trimdate.getMonth() + 1}`
    }-${
      trimdate.getDate() > 9 ? trimdate.getDate() : `0${trimdate.getDate()}`
    }-${trimdate.getFullYear()}`;
  });

  const rmadetails = {
    contactperson,
    contactno,
    salesmanid: sid,
    contactemail,
    company,
    products,
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setCompError(false);
    setNumError(false);
    setNameErrorText("");
    setEmailErrorText("");
    setCompErrorText("");
    setNumErrorText("");
    if (products.length === 0) {
      Toast.fire({
        icon: "error",
        title: "Please add a product",
        customClass: "swalpopup",
        timer: 1500,
        width: 315,
      });
      setLoading(false);
    }
    if (contactperson === "") {
      setNameError(true);
      setNameErrorText("Required");
      setLoading(false);
    }
    if (contactemail === "") {
      setEmailError(true);
      setEmailErrorText("Required");
      setLoading(false);
    } else if (!contactemail.match(emailRegex)) {
      setEmailError(true);
      setEmailErrorText("Invalid email");
      setLoading(false);
    }
    if (company === "") {
      setCompError(true);
      setCompErrorText("Required");
      setLoading(false);
    }
    if (contactno === "") {
      setNumError(true);
      setNumErrorText("Required");
      setLoading(false);
    } else if (!contactno.match(phoneRegex)) {
      setNumError(true);
      setNumErrorText("Invalid phone number");
      setLoading(false);
    }
    if (
      contactperson &&
      contactemail.match(emailRegex) &&
      company &&
      contactno.match(phoneRegex)
    ) {
      setTimeout(() => {
        axios
          .post(`${config.baseURL}/newRMA`, rmadetails)
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
            console.log(error.response.data.message);
          });
      }, 2000);
    }
  };

  return (
    <Box>
    <Card
      sx={{
        width: "98%",
        height: "100%",
        m: 3,
      }}
    >
      <CardContent>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
              onBlur={() => {
                setNameError(false);
                setNameErrorText("");
                if (contactperson === "") {
                  setNameError(true);
                  setNameErrorText("Required");
                }
              }}
              onChange={(e) => setContactperson(e.target.value)}
              error={nameError}
              helperText={nameErrorText}
            />
            <TextField
              value={contactemail}
              required
              id="filled-required"
              label="Customer Email"
              variant="filled"
              onBlur={() => {
                setEmailError(false);
                setEmailErrorText("");
                if (contactemail === "") {
                  setEmailError(true);
                  setEmailErrorText("Required");
                } else if (!contactemail.match(emailRegex)) {
                  setEmailError(true);
                  setEmailErrorText("Invalid Email");
                }
              }}
              onChange={(e) => setContactemail(e.target.value)}
              error={emailError}
              helperText={emailErrorText}
            />
            <TextField
              value={company}
              required
              id="filled-required"
              label="Company"
              variant="filled"
              onBlur={() => {
                setCompError(false);
                setCompErrorText("");
                if (company === "") {
                  setCompError(true);
                  setCompErrorText("Required");
                }
              }}
              onChange={(e) => setCompany(e.target.value)}
              error={compError}
              helperText={compErrorText}
            />
            <TextField
              value={contactno}
              required
              id="filled-required"
              label="Contact Number"
              variant="filled"
              onBlur={() => {
                setNumError(false);
                setNameErrorText("");
                if (contactno === "") {
                  setNumError(true);
                  setNumErrorText("Required");
                } else if (!contactno.match(phoneRegex)) {
                  setNumError(true);
                  setNumErrorText("Invalid contact number");
                }
              }}
              onChange={(e) => setContactno(e.target.value)}
              error={numError}
              helperText={numErrorText}
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
              <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                components={{
                  Toolbar: EditToolbar,
                  NoRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No products added
                    </Stack>
                  ),
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
              variants={variants}
              animate={controls}
              className="animatable"
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.9 }}
            >
              <LoadingButton
                type="submit"
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
                endIcon={<SendIcon />}
                loadingPosition="end"
                onClick={handleSubmit}
              >
                Submit
              </LoadingButton>
            </motion.div>
          </Box>
        </form>
      </CardContent>
    </Card>
    </Box>
  );
};

export default CreateRMA;
