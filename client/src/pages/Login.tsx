import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import TopBar from '../components/header/TopBar';
import SubmitButton from '../components/form/SubmitButton';
import ErrorAlert from '../components/form/ErrorAlert';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import config from '../config/config';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useTogglePasword from '../hooks/useTogglePassword';
import { flexbox } from '@mui/system';
import FormField from '../components/form/FormField';

interface FormValues {
  email: string,
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const {toggle, passwordType, showPassword} = useTogglePasword();

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
    mutation.mutate(data, { onSuccess: () => navigate("/dashboard") })
  }

  return (
    <>
      <header> 
        <TopBar />
      </header>
      <div className="bluebackground">
        <Container className="formcontainer shadow">
          <h2 className="formheader">Login to your account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="formlabels">Email Address </p>
              <div className="flexcontainer">
                <input className="formfield" type="email" {...register("email", { required: "Email cannot be empty", pattern: { value: /^\S+@\S+\.\S+$/i, message: "Please enter a valid email" } })} />
              </div>
              <p className="errormsg">{errors.email?.message}</p>
            </div>
            <div>
              <p className="formlabels">Password </p>
              <div className="flexcontainer">
                <div style={{border: "solid 1px #d3d3d3", borderRadius: 15, display: "flex", flexDirection: "row", width: "85%", justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                <input className="passwordfield" style={{flexGrow: 11}} type={passwordType} {...register("password", { required: "Password cannot be empty", pattern: { value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/i, message: "Password should be over 8 characters long with a mix of uppercase/lowercase letters and numbers" } })} />
                <div style={{flexGrow: 1, paddingRight: 5}} className="flexcontainer" onClick={toggle}>{showPassword? <VisibilityIcon style={{ color: '#0A2540'}}  />:<VisibilityOffIcon style={{ color: '#0A2540'}}  />}</div>
                </div>
              </div>
              <p className="errormsg">{errors.password?.message}</p>
            </div>
            {mutation.isError && axios.isAxiosError(mutation.error) ? <ErrorAlert error={mutation.error} /> : <></>}
            <div className="flexcontainer" style={{ marginTop: 40 }}>
              <SubmitButton loading={mutation.isLoading} multipart={false} />
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}

export default Login;