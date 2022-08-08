import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import WarningIcon from "@mui/icons-material/Warning";
import {
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField
} from "@mui/material";
import { useState } from "react";
import {
    FieldError,
    Path,
    RegisterOptions,
    UseFormRegister
} from "react-hook-form";
import useTogglePasword from "../../hooks/useTogglePassword";

type AllowedInputs = "email" | "password" | "text" | "number";

interface FormFieldProps<T> {
  label: string;
  name: Path<T>;
  defaultvalue?: string;
  type: AllowedInputs;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions;
  error?: FieldError;
  readOnly?;
  disabled?: boolean;
}

const FormField = <T,>({
  label,
  name,
  defaultvalue,
  type,
  register,
  rules,
  error,
  readOnly,
  disabled
}: FormFieldProps<T>) => {
  const { toggle, passwordType, showPassword } = useTogglePasword();

  const inputProps = {
    style: {
      paddingTop: 10,
      paddingBottom: 12,
      paddingLeft: 15,
      paddingRight: 15,
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p className="formlabels"> {label} </p>
      <div className="formfieldcontainer">
        <OutlinedInput
          size="small"
          type={type === "password" ? passwordType : type}
          className="textfield"
          defaultValue={defaultvalue}
          disabled={disabled}
          sx={{
            borderRadius: 3,
            border: "solid 1px #d3d3d3",
            backgroundColor: disabled && "#e3e8ee"
          }}
          inputProps={inputProps}

        {...(register && register(name, rules))}
          endAdornment={
            type === "password" && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggle}
                  disabled={disabled}
                  sx={{
                    "&:disabled": {
                      opacity: "50%"
                    }
                  }}
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#0A2540" }} />
                  ) : (
                    <Visibility sx={{ color: "#0A2540" }} />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }
          label={label}
          readOnly={readOnly}
        />
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

export default FormField;
