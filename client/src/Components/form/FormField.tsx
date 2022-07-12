import React from "react";
import styled from "styled-components";
import { UseFormRegister, RegisterOptions, Path } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useTogglePasword from "../../hooks/useTogglePassword";

type AllowedInputs = "email" | "password" | "text" | "number";

const Input = styled.input<{ $password: boolean }>`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  border: 1px solid #d3d3d3;
  border-radius: ${(props) => (props.$password ? "15px 0 0 15px" : "15px")};
  flex-grow: ${(props) => (props.$password ? 11 : 1)};
  color: #0a2540;
`;

interface FormFieldProps<T> {
  label: string;
  name: Path<T>;
  defaultvalue?: string;
  errormsg?: string;
  type: AllowedInputs;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions;
}

const FormField = <T,>({
  label,
  name,
  defaultvalue,
  errormsg,
  type,
  register,
  rules,
}: FormFieldProps<T>) => {
  const { toggle, passwordType, showPassword } = useTogglePasword();
  let field = null;

  if (type === "password") {
    field = (
      <>
        <Input
          $password
          type={passwordType}
          defaultValue={defaultvalue}
          {...(register && register(name, rules))}
        />
        <div className="passwordicon flexcontainer" onClick={toggle}>
          {showPassword ? (
            <VisibilityIcon style={{ color: "#0A2540" }} />
          ) : (
            <VisibilityOffIcon style={{ color: "#0A2540" }} />
          )}
        </div>
      </>
    );
  } else {
    field = (
      <Input
        $password={false}
        type={type}
        defaultValue={defaultvalue}
        {...(register && register(name, rules))}
      />
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p className="formlabels"> {label} </p>
      <div className="formfieldcontainer" style={{ alignSelf: "center" }}>
        {field}
      </div>
      <p className="errormsg">{errormsg}</p>
    </div>
  );
};

export default FormField;
