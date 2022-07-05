import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import TopBar from "../../components/header/TopBar";
import SubmitButton from "../../components/form/SubmitButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormField from "../../components/form/FormField";
import {
  EmailValidation,
  NameValidation,
  CompanyValidation,
  PhoneNoValidation,
} from "../../utils/FormValidation";
import { PostRMA } from "../../api/RmaDB";

interface FormValues {
  name: string;
  email: string;
  company: string;
  contactno: number;
}

const CreateRMA: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const mutation = useMutation(PostRMA);

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, { onSuccess: () => navigate("/rma") });
  };

  return (
    <Container className="formcontainer shadow">
      <h2 className="formheader">Apply for RMA</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Customer's Name"
          name="name"
          type="text"
          register={register}
          errormsg={errors.name?.message}
          rules={NameValidation}
        />
        <FormField
          label="Customer's Email"
          name="email"
          type="text"
          register={register}
          errormsg={errors.email?.message}
          rules={EmailValidation}
        />
        <FormField
          label="Company Name"
          name="company"
          type="text"
          register={register}
          errormsg={errors.company?.message}
          rules={CompanyValidation}
        />
        <FormField
          label="Contact No"
          name="contactno"
          type="text"
          register={register}
          errormsg={errors.contactno?.message}
          rules={PhoneNoValidation}
        />
        {mutation.isError && axios.isAxiosError(mutation.error) ? (
          <ErrorAlert error={mutation.error} />
        ) : (
          <></>
        )}
        <div className="flexcontainer" style={{ marginTop: 20 }}>
          <SubmitButton
            text="Submit"
            loading={mutation.isLoading}
            multipart={false}
          />
        </div>
      </form>
    </Container>
  );
};
export default CreateRMA;
