import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

function CompanyName() {
  const [company, setCompany] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCompany(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 200, marginLeft: 3 }}>
        <InputLabel>Customer Company</InputLabel>
        <Select
          id="outlined-basic"
          value={company}
          onChange={handleChange}
          size="small"
          label="Customer Company"
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={1}>SERVO_LIVE</MenuItem>
          <MenuItem value={2}>LEAPTRON_LIVE</MenuItem>
          <MenuItem value={3}>DIRAK181025</MenuItem>
          <MenuItem value={4}>PMC_LIVE</MenuItem>
          <MenuItem value={5}>PORTWELL_LIVE</MenuItem>
          <MenuItem value={6}>ALL</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function LoanType() {
  const [type, setType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 200, marginLeft: 3, marginTop: 2 }}>
        <InputLabel>Loan Type</InputLabel>
        <Select
          id="outlined-basic"
          value={type}
          onChange={handleChange}
          label="Loan Type"
          size="small"
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={1}>Internal</MenuItem>
          <MenuItem value={2}>External</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function CollectionType() {
  const [collection, setCollection] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCollection(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 200, marginLeft: 3, marginTop: 2 }}>
        <InputLabel>Collection Type</InputLabel>
        <Select
          id="outlined-basic"
          value={collection}
          onChange={handleChange}
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
    </div>
  );
}

function DurationOfLoan() {
  const [duration, setDuration] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDuration(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 200, marginLeft: 3, marginTop: 2 }}>
        <InputLabel>Duration</InputLabel>
        <Select
          id="outlined-basic"
          value={duration}
          onChange={handleChange}
          label="Duration"
          size="small"
        >
          {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
          <MenuItem value={7}>1 Week</MenuItem>
          <MenuItem value={14}>2 Weeks</MenuItem>
          <MenuItem value={21}>3 Weeks</MenuItem>
          <MenuItem value={30}>1 Month</MenuItem>
          <MenuItem value={60}>2 Months</MenuItem>
          <MenuItem value={90}>3 Months</MenuItem>
          <MenuItem value={120}>4 Months</MenuItem>
          <MenuItem value={150}>5 Months</MenuItem>
          <MenuItem value={180}>6 Months</MenuItem>
          <MenuItem value={210}>7 Months</MenuItem>
          <MenuItem value={240}>8 Months</MenuItem>
          <MenuItem value={270}>9 Months</MenuItem>
          <MenuItem value={300}>10 Months</MenuItem>
          <MenuItem value={330}>11 Months</MenuItem>
          <MenuItem value={360}>12 Months</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export { CompanyName, LoanType, CollectionType, DurationOfLoan };
