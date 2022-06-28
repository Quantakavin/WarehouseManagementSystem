import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/form/SubmitButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormField from "../../components/form/FormField";
import {
  EmailValidation,
  PasswordValidation,
} from "../../utils/FormValidation";
import LoginUser from "../../api/user/LoginUser";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const mutation = useMutation(LoginUser, {
    onSuccess: (data) => {
      const { token, id, name } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", id);
      localStorage.setItem("username", name);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, { onSuccess: () => navigate("/dashboard") });
  };

  return (
    <Container className="formcontainer shadow">
      <h2 className="formheader">Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Email Address"
          name="email"
          type="email"
          register={register}
          errormsg={errors.email?.message}
          rules={EmailValidation}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          register={register}
          errormsg={errors.password?.message}
          rules={PasswordValidation}
        />

        {mutation.isError && axios.isAxiosError(mutation.error) ? (
          <ErrorAlert error={mutation.error} />
        ) : null}
        <div className="flexcontainer" style={{ marginTop: 20 }}>
          <SubmitButton
            text="Continue"
            loading={mutation.isLoading}
            multipart={false}
          />
        </div>
      </form>
    </Container>
  );
};

export default Login;
