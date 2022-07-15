import { TransgenderTwoTone } from "@mui/icons-material";
import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";
import React from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";
import { Option } from "../../utils/CommonTypes";

interface SelectProps<IFormValues> {
  label: string;
  name: string;
  defaultoption: string;
  multiselect: boolean;
  options: Option[];
  errormsg?: string;
  register?: UseFormRegister<IFormValues>;
  rules?: RegisterOptions;
}

const SelectDropdown: React.FC<SelectProps<any>> = ({
  label,
  name,
  errormsg,
  options,
  register,
  rules,
  defaultoption,
  multiselect,
}) => {

  const field = (
      <Select
      size="small"
      defaultValue={multiselect? []: ""}
      className="selectfield"
      name={name}
      {...(register && register(name, rules))}
      sx={{ 
        borderRadius: "15px",
        paddingTop: "0px",
        textOverflow: "ellipsis", 
        overflow: "hidden", 
        whiteSpace: "pre"
      }}
      displayEmpty
      multiple={multiselect}
    >
      <MenuItem value={multiselect? [] : ""} disabled hidden>
      {defaultoption}
      </MenuItem>
      {options.map(({ id, text, value }) => (
      <MenuItem key={id} value={value}>

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
        {/* <select
          defaultValue=""
          className="formselect"
          name={name}
          {...(register && register(name, rules))}
          multiple={multiselect}
        >
          <option value="" disabled hidden>
            {defaultoption}
          </option>
          {options.map(({ id, text, value }) => (
            <option key={id} value={value}>{text}</option>
          ))}
        </select> */}
      </div>
      <p className="errormsg">{errormsg}</p>
    </div>
  );
};

export default SelectDropdown;
