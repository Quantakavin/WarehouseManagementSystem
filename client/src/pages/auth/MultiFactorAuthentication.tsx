import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { Box, Link, Typography } from "@mui/material";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormContainer from "../../components/form/FormContainer";
import FormField from "../../components/form/FormField";
import SubmitButton from "../../components/form/SubmitButton";
import {
  MultiFactorCodeValidation
} from "../../utils/FormValidation";
// import LoginUser from "../../api/user/LoginUser";
import { LoginUser, Resend2FAToken, Verify2FAToken } from "../../api/UserDB";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser, selectMobileNo, selectToken, authenticateUser, selectId, selectName } from "../../app/reducers/CurrentUserSlice";
import { ChangeTab, Reset } from "../../app/reducers/SidebarSlice";
import { Toast } from "../../components/alerts/SweetAlert";
import { stubString } from "lodash";

interface FormValues {
  code: number | string;
}

const MultiFactorAuthentication: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const usermobileno = useAppSelector(selectMobileNo);
  const usertoken = useAppSelector(selectToken);
  const userid = useAppSelector(selectId);
  const username = useAppSelector(selectName);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onSubmit" });

  const resendmutation = useMutation(Resend2FAToken);

  const verifymutation = useMutation((data: FormValues) =>
  Verify2FAToken(data, usermobileno));

  const controls = useAnimation();

  const variants = {
    detecterror: () => ({
      // rotate: [-1, 1.3, 0],
      x: [10, -10, 0, 10, -10, 0],
      transition: {
        duration: 0.4,
      },
    }),
  };

  const onSubmit = (data: FormValues) => {
    verifymutation.mutate(data, {
      onSuccess: (data) => {
        localStorage.setItem("token", usertoken);
        localStorage.setItem("user_id", userid.toString());
        localStorage.setItem("username", username);
        dispatch(authenticateUser());
        dispatch(ChangeTab({ currenttab: "Dashboard" }));
        Toast.fire({
          icon: "success",
          title: "Logged in successfully",
          customClass: "swalpopup",
          timer: 1500,
          width: 330,
        });
        console.log("the data is ", data)
        return navigate("/dashboard", { replace: true });
      },
      onError: (data) => {
        controls.start("detecterror");
      },
    });
  };

  const resend = () => {
    resendmutation.mutate({mobileno: usermobileno},)
  }

  return (
    <motion.div variants={variants} animate={controls}>
      <FormContainer
        header="Two-Step Authentication"
        multistep={false}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <Typography className="formsubheading">To continue, please enter the 6-digit verification code send to
          your phone ending in {usermobileno.substring(usermobileno.length-4)}</Typography>

          <Box className="formsubheading">Didnt recieve a code?         <Link
          onClick={() => {
            resend()
          }}
          underline="hover"
          sx={{ ml: "10px" }}
        >
          Resend
        </Link></Box>
        <FormField
          label="Enter 6-digit Code"
          name="code"
          type="number"
          register={register}
          error={errors.code}
          rules={MultiFactorCodeValidation}
        />
        {verifymutation.isError && axios.isAxiosError(verifymutation.error) ? (
          <ErrorAlert error={verifymutation.error} />
        ) : null}
         <Box className="flexcontainer" style={{ marginTop: 20 }}>
          <SubmitButton
            text="Continue"
            loading={verifymutation.isLoading}
            multipart={false}
          />
        </Box> 
        {/* <FormField
          label="Email Address"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          rules={EmailValidation}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          rules={PasswordValidation}
        />

        {mutation.isError && axios.isAxiosError(mutation.error) ? (
          <ErrorAlert error={mutation.error} />
        ) : null}

        <Link
          onClick={() => {
            navigate("/forgetpassword");
          }}
          underline="hover"
          sx={{ ml: 10 }}
        >
          Forgot your password?
        </Link>

        <Box className="flexcontainer" style={{ marginTop: 20 }}>
          <SubmitButton
            text="Continue"
            loading={mutation.isLoading}
            multipart={false}
          />
        </Box> */}
      </FormContainer>
    </motion.div>
  );
};

export default MultiFactorAuthentication;
