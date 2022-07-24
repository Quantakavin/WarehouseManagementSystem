import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { randomId } from "@mui/x-data-grid-generator";
import {
  DataGridPro,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  GridToolbarContainer,
  MuiEvent,
} from "@mui/x-data-grid-pro";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../../components/alerts/SweetAlert";
import "./TLoanTable/table.css";

function newtloan() {
  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [
        ...oldRows,
        { id, ItemNo: "", ItemName: "", isNew: true },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "ItemNo" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
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
      { field: "ItemNo", headerName: "Item No.", width: 180, editable: true },
      {
        field: "ItemName",
        headerName: "Item Name",
        width: 180,
        editable: true,
      },
      { field: "BatchNo", headerName: "Batch No.", width: 180, editable: true },
      {
        field: "Quantity",
        headerName: "Quantity",
        type: "number",
        editable: true,
      },

      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 80,
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
        {console.log(rows)}
      </Box>
    );
  };

  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [number, setNumber] = useState("");
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

  console.log(userRole);

  const items = rows.map(({ id, isNew, ...rows }) => rows);
  console.log(items);

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

  // const handleChangeRequiredDate = (newValue: Date | null) => {
  //   setRdate(newValue);
  // };

  const navigate = useNavigate();

  const submitLoan = (e) => {
    e.preventDefault();
    try {
      const results = axios
        .post("http://localhost:5000/api/tloan/newloan", {
          type,
          company,
          number,
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
          number,
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

  useEffect(() => {
    var date = new Date().toISOString().split("T")[0];

    setRDate(date);
  });

  useEffect(() => {
    const loanNumber = "1ccccdewewcwe";
    setNumber(loanNumber);
  });

  useEffect(() => {
    const uid = localStorage.getItem("user_id");
    setUser(uid);
  });

  useEffect(() => {
    const Employee = localStorage.getItem("username");
    setName(Employee);
  });

  console.log(user);
  console.log(localStorage);
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
      <Card sx={{ width: "98%", height: "100%", margin: 3 }}>
        {/* <form onSubmit={submitLoan}> */}
        <CardContent>
          <h2>Apply TLoan</h2>
          {FullFeaturedCrudGrid()}

          <Box sx={{ marginTop: 1, display: "flex" }}>
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
              sx={{ marginLeft: 3 }}
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
              >
                <MenuItem value={"1"}>SERVO_LIVE</MenuItem>
                <MenuItem value={"2"}>LEAPTRON_LIVE</MenuItem>
                <MenuItem value={"3"}>DIRAK181025</MenuItem>
                <MenuItem value={"4"}>PMC_LIVE</MenuItem>
                <MenuItem value={"5"}>PORTWELL_LIVE</MenuItem>
                <MenuItem value={"6"}>ALL</MenuItem>
              </Select>
            </FormControl>
            {console.log(company)}
          </Box>

          <Box sx={{ display: "flex" }}>
            <TextField
              sx={{ width: 970, marginLeft: 2, marginTop: 2 }}
              multiline
              rows={7.65}
              label="Purpose"
              onChange={(e) => setPurpose(e.target.value)}
            ></TextField>
            <Box sx={{ marginLeft: 0.3, float: "right" }}>
              {/* Duration */}
              <FormControl sx={{ width: 200, marginLeft: 3, marginTop: 2 }}>
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
              </FormControl>

              {/* Collection */}
              <FormControl sx={{ width: 200, marginLeft: 3, marginTop: 2 }}>
                <InputLabel>Collection Type</InputLabel>
                <Select
                  id="outlined-basic"
                  value={collection}
                  onChange={handleChangeCollection}
                  label="Collection Type"
                  size="small"
                >
                  {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                  <MenuItem value={"Self-Collection"}>Self-Collection</MenuItem>
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
                >
                  <MenuItem value={"1"}>Internal</MenuItem>
                  <MenuItem value={"2"}>External</MenuItem>
                </Select>
              </FormControl>

              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack >
        <DesktopDatePicker
          label="Required Date"
          inputFormat="yyyy-MM-dd"
          value={requireddate}
          onChange={handleChangeRequiredDate}
          renderInput={(params) => <TextField size="small" {...params} sx={{width: 200, marginLeft:3, marginTop: 2}} />}
        
        />
        </Stack>
        </LocalizationProvider> */}
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary"></Typography>

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
                onClick={() => navigate("/tloan")}
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
                  backgroundColor: "#063970",
                  width: 150,
                  height: 50,
                  borderRadius: 10,
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
                onClick={submitLoan}
              >
                Submit
              </Button>
            </motion.div>
          </Box>
        </CardContent>
        {/* </form> */}
      </Card>
    );
  };
  return getCard();
}

export default newtloan;
