import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import TopBar from '../../components/header/TopBar';
import SubmitButton from '../../components/form/SubmitButton';
import ErrorAlert from '../../components/form/ErrorAlert';
import { Container } from 'react-bootstrap';

interface FormValues {
    email: string,
    password: string
  }

const AddUser: React.FC = () => {
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
      mutation.mutate(data, { onSuccess: () => navigate("/dashboard") })
    }

    
    return(
        <>
        <header> 
        <TopBar />
        </header>
        <div className="bluebackground">
        <Container className="formcontainer shadow">
        <h2 className="formheader">Add User</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="formlabels">Email Address </p>
              <div className="flexcontainer">
                <input className="formfield" type="email" {...register("email", { required: "Email cannot be empty", pattern: { value: /^\S+@\S+\.\S+$/i, message: "Please enter a valid email" } })} />
              </div>
              <p className="errormsg">{errors.email?.message}</p>
            </div>
          </form>
        </Container>
        </div>
        </>
    )
}
export default AddUser;