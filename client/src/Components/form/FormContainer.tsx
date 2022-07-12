import React from "react";
import { Container } from "react-bootstrap";
import { UseFormHandleSubmit } from "react-hook-form";


interface FormContainerProps<T> {
    header: string;
    multistep: boolean;
    children: React.ReactNode;
    handleSubmit: UseFormHandleSubmit<T>;
    onSubmit: (data: T) => void;
}

const FormContainer = <T,>({children, header, multistep, handleSubmit, onSubmit } : FormContainerProps<T>) => {

    return (
        <Container className={multistep? "multiformcontainer shadow":"formcontainer shadow"}>
        <h2 className="formheader">{header}</h2>
        <form onSubmit={handleSubmit(onSubmit)} >

        {children}
        </form>
        </Container>
    )
}

export default FormContainer;