import React from 'react';
import styled from 'styled-components';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import {Option} from "../../utils/CommonTypes"

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

const SelectDropdown: React.FC<SelectProps<any>> = ({ label, name, errormsg, options, register, rules, defaultoption, multiselect }) => {

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <p className="formlabels"> {label} </p>
            <div className="formfieldcontainer" style={{ alignSelf: "center" }}>
            <select defaultValue={""} className="formselect" name={name} {...(register && register(name, rules))} multiple={multiselect}>
                <option value="" disabled hidden>{defaultoption}</option>
                {options.map(({ text, value }) => (
                <option value={value}>{text}</option>
                ))}
            </select>
            </div>
            <p className="errormsg">{errormsg}</p>
        </div>
    )
}

export default SelectDropdown;