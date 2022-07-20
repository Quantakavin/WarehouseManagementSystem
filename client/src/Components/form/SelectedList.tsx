import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";
import { Option } from "../../utils/CommonTypes";
import CloseIcon from "@mui/icons-material/Close";

interface SelectProps {
    label: string;
    getname: (name: string) => string;
    selectedValues: any[];
    unselect: (value: any) => void;
    select: (event: SelectChangeEvent<any>, value: any) => void;
    options: Option[];
    defaultOptions?:  (feature: any) => string | number | string[];
}

const SelectedList: React.FC<SelectProps> = ({
    getname,
    label,
    selectedValues,
    unselect,
    select,
    options,
    defaultOptions
}) => {

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="formlabels" style={{ marginTop: 20 }}>
            {label}
          </p>
          <div style={{ alignSelf: "center", width: "85%" }}>
            {selectedValues.map((value) => {
              return (
                <div className="selectlist" key={value}>
                  <div
                    style={{
                      flex: 14,
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    { getname(value) }
                  </div>
                  <div style={{ flex: 3, fontWeight: 500 }}>
                    <Select
                      defaultValue={defaultOptions? defaultOptions(value) : options[0].value}
                      autoWidth
                      label="Age"
                      size="small"
                      className="smallselectfield"
                      onChange={(e) => select(e, value)}
                    >
                      {options.map((option) => {
                        return (
                          <MenuItem key={option.id} value={option.value}>
                            {option.text}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <div style={{ flex: 1, fontWeight: 500 }}>
                    <button
                      onClick={() => unselect(value)}
                      style={{ marginLeft: 5, marginRight: "-5%" }}
                      type="button"
                      className="buttonremovestyling"
                    >
                      <CloseIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    );
};

export default SelectedList;
