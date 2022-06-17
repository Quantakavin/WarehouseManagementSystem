import React, { useState } from 'react';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import '../styles/form.scss';
import TopBar from '../components/TopBar';
import SubmitButton from '../components/SubmitButton';
import ErrorAlert from '../components/ErrorAlert';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import config from '../config/config';

interface FormValues {
  email: string,
  password: string
}

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const mutation = useMutation(async (formData: FormValues) => {
    return await axios.post(`http://localhost:5000/api/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, {
    onSuccess: (data: AxiosResponse) => {
      const {token, id, name} = data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', id);
      localStorage.setItem('username', name);
    }
  })

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, { onSuccess: () => navigate("/userhome") })
  }

  return (
    <>
      <header>
        <TopBar />
      </header>
      <div style={{ backgroundColor: "#e3e8ee", height: "100vh", overflow: 'auto' }}>
        <Container className="formlogo d-none d-sm-block">
        </Container>
        <Container className="formcontainer shadow">
          <h2 style={{ marginLeft: '8%', paddingBottom: 20, fontWeight: 700 }}>Login to your account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="formlabels">Email Address </p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input className="formfield" type="email" {...register("email", { required: "Email cannot be empty", pattern: { value: /^\S+@\S+\.\S+$/i, message: "Please enter a valid email" } })} />
              </div>
              <p style={{ color: "red", fontSize: "0.85em", marginLeft: "8%", marginTop: 5 }}>{errors.email?.message}</p>
            </div>
            <div>
              <p className="formlabels">Password </p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input className="formfield" type="password" {...register("password", { required: "Password cannot be empty", pattern: { value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/i, message: "Password should be over 8 characters long with a mix of uppercase/lowercase letters and numbers" } })} />
              </div>
              <p style={{ color: "red", fontSize: "0.85em", marginLeft: "8%", marginTop: 5 }}>{errors.password?.message}</p>
            </div>
            {mutation.isError && axios.isAxiosError(mutation.error) ? <ErrorAlert error={mutation.error} /> : <></>}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
              <SubmitButton loading={mutation.isLoading} />
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}

export default Login;