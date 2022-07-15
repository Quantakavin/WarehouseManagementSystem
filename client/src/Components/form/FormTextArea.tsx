import React from "react";
import styled from "styled-components";
import { UseFormRegister, RegisterOptions, Path } from "react-hook-form";

type AllowedInputs = "email" | "password" | "text" | "number";

const Input = styled.textarea`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
  flex-grow: 1;
  color: #0a2540;
`;

interface FormFieldProps<T> {
  label: string;
  name: Path<T>;
  defaultvalue?: string;
  errormsg?: string;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions;
}

const FormTextArea = <T,>({
  label,
  name,
  defaultvalue,
  errormsg,
  register,
  rules
} : FormFieldProps<T>) => {

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p className="formlabels"> {label} </p>
      <div className="formfieldcontainer" style={{ alignSelf: "center" }}>
        <Input {...(register && register(name, rules))} defaultValue = {defaultvalue} rows={5}></Input>
      </div>
      <p className="errormsg">{errormsg}</p>
    </div>
  );
};

export default FormTextArea;
