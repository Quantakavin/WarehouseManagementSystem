import { Checkbox, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { Option } from "../../utils/CommonTypes";

interface SelectProps {
  label: string;
  name: string;
  selectedValues: any[];
  changeSelectedValues: (event: SelectChangeEvent<any[]>) => void;
  placeholder: string;
  options: Option[];
}

const MultiSelectDropdown: React.FC<SelectProps> = ({
  name,
  label,
  selectedValues,
  changeSelectedValues,
  placeholder,
  options,
}) => {
  console.log("selected values are ", selectedValues);

    const field = (
        <Select
            size="small"
            className="selectfield"
            name={name}
            sx={{
                borderRadius: "10px",
                paddingTop: "0px",
            }}
            value={selectedValues}
            onChange={changeSelectedValues}
            defaultValue={[""]}
            multiple
        >
            <MenuItem value="" disabled hidden>
                {placeholder}
            </MenuItem>
            {options.map(({ id, text, value }) => (
                <MenuItem key={id} value={value}>
                    {/* <Checkbox checked={selectedValues.indexOf(value) > -1} />
                    <ListItemText primary={text} /> */}
                    {text}
                </MenuItem>
            ))}
        </Select>
    )

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <p className="formlabels"> {label} </p>
            <div className="formfieldcontainer">
                {field}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
