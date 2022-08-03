import WarningIcon from "@mui/icons-material/Warning";
import { MenuItem, Select } from "@mui/material";
import React from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Option } from "../../utils/CommonTypes";

interface SelectProps<IFormValues> {
  label: string;
  name: string;
  defaultoption?: string;
  options: Option[];
  error?: FieldError;
  register?: UseFormRegister<IFormValues>;
  rules?: RegisterOptions;
}

const SelectDropdown: React.FC<SelectProps<any>> = ({
  label,
  name,
  error,
  options,
  register,
  rules,
  defaultoption,
}) => {
  const field = (
    <Select
      size="small"
      defaultValue={defaultoption}
      className="selectfield"
      name={name}
      {...(register && register(name, rules))}
      sx={{
        borderRadius: "10px",
        paddingTop: "0px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "pre",
      }}
      displayEmpty
    >
      {options.map(({ id, text, value }) => (
        <MenuItem key={id} value={value}>
          {text}
        </MenuItem>
      ))}
    </Select>
  );

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
      <p className="errormsg">
        {error && (
          <>
            <WarningIcon sx={{ fontSize: "15px", marginBottom: "2px" }} />{" "}
            {error?.message}
          </>
        )}
      </p>
    </div>
  );
};

export default SelectDropdown;
