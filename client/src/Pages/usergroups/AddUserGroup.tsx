import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import TopBar from '../../components/header/TopBar';
import SubmitButton from '../../components/form/SubmitButton';
import ErrorAlert from '../../components/form/ErrorAlert';
import { Container } from 'react-bootstrap';
import FormField from '../../components/form/FormField';
import {NameValidation} from '../../utils/FormValidation';
import { PostUserGroup } from "../../api/UserGroupDB";

interface FormValues {
    name: string,
    description: string
}

const AddUserGroup: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  
    const mutation = useMutation(PostUserGroup)
  
    const onSubmit = (data: FormValues) => {
      mutation.mutate(data, { onSuccess: () => navigate("/users") })
    }

    
    return(
        <>
        <Container className="formcontainer shadow">
        <h2 className="formheader">Create User Group</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Name" name="name" type="text" register={register} errormsg={errors.name?.message} rules={NameValidation}/>
            <FormField label="Description" name="description" type="text" register={register} errormsg={errors.description?.message} rules={NameValidation}/>
            {mutation.isError && axios.isAxiosError(mutation.error) ? <ErrorAlert error={mutation.error} /> : <></>}
            <div className="flexcontainer" style={{ marginTop: 20}}>
              <SubmitButton text="Submit" loading={mutation.isLoading} multipart={false} />
            </div>
          </form>
        </Container>
        </>
    )
}
export default AddUserGroup;