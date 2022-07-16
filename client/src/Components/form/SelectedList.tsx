import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";
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
    label,
    options
}) => {

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="formlabels" style={{ marginTop: 20 }}>
            {label}
          </p>
          <div style={{ alignSelf: "center", width: "85%" }}>
            {selectedFeatures.map((feature) => {
              return (
                <div className="selectlist">
                  <div
                    style={{
                      flex: 14,
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {
                      featuresQuery.data.data.find(
                        (data) => data.FeatureID === feature
                      ).FeatureName
                    }
                  </div>
                  <div style={{ flex: 3, fontWeight: 500 }}>
                    <Select
                      defaultValue={1}
                      autoWidth
                      label="Age"
                      size="small"
                      className="smallselectfield"
                      onChange={(e) => assignFeatureRight(e, feature)}
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
                      onClick={() => unselectFeature(feature)}
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

export default MultiSelectDropdown;
