import React from 'react';
import styled from 'styled-components';
import { UseFormRegister, RegisterOptions } from 'react-hook-form'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useTogglePasword from '../../hooks/useTogglePassword';

type allowedInputs = 'email' | 'password' | 'text' | 'number';

const Input = styled.input<{ $password: boolean }>`
padding-top: 8px;
padding-bottom: 8px;
padding-left: 10px;
margin-bottom: 5px;
border: 1px solid #d3d3d3;
border-radius: ${props => props.$password ? "15px 0 0 15px" : "15px"};
flex-grow: ${props => props.$password ? 11 : 1};
color: #0A2540; 
`;


interface FormFieldProps<TFieldValues> {
    label: string;
    name: string;
    errormsg?: string;
    type: allowedInputs;
    register?: UseFormRegister<TFieldValues>;
    rules?: RegisterOptions;
}

const FormField: React.FC<FormFieldProps<any>> = ({ label, name, errormsg, type, register, rules }) => {

    const { toggle, passwordType, showPassword } = useTogglePasword();
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <p className="formlabels"> {label} </p>
            <div className="formfieldcontainer" style={{alignSelf: "center"}}>
                <Input $password={type==="password"} type={type === "password" ? passwordType : type} {...(register && register(name, rules))} />
                {type === "password" ? <div className="passwordicon flexcontainer" onClick={toggle}>{showPassword ? <VisibilityIcon style={{ color: '#0A2540' }} /> : <VisibilityOffIcon style={{ color: '#0A2540' }} />}</div> : <></>}
            </div>
            <p className="errormsg">{errormsg}</p>
        </div>
    )
}

export default FormField;