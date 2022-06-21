import React, { useState } from 'react';
import {UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form'

interface FormFieldProps<TFieldValues> {
    name: string;
    errormsg?: string;
    type: 'email' | 'password' | 'text' | 'number';
    register?: UseFormRegister<TFieldValues>;
    rules?: RegisterOptions;
}

const FormField: React.FC<FormFieldProps<FieldValues>> = ({name, errormsg, type, register}) => {
    return(
        <div>
        <p className="formlabels"> {name} </p>
        <div className="flexcontainer">
          <input className="formfield" type={type} {...register} />
        </div>
        <p className="errormsg">{errormsg}</p>
        </div>
    )
}

export default FormField;