import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { Box, Link } from "@mui/material";
import ErrorAlert from "../../Components/form/ErrorAlert";
import FormContainer from "../../Components/form/FormContainer";
import FormField from "../../Components/form/FormField";
import SubmitButton from "../../Components/form/SubmitButton";
import {
  EmailValidation,
  PasswordValidation,
} from "../../utils/FormValidation";
import { LoginUser } from "../../api/UserDB";
import { useAppDispatch } from "../../app/hooks";
import { removeUser, setUser } from "../../app/reducers/CurrentUserSlice";
import { ChangeTab } from "../../app/reducers/SidebarSlice";
import { Toast } from "../../Components/alerts/SweetAlert";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onSubmit" });

  const mutation = useMutation(LoginUser, {
    onSuccess: (data) => {
      const { token, id, name, usergroup, permissions, enabled2FA, mobileNo } = data.data;

      if (enabled2FA === 1) {
        dispatch(removeUser())
        dispatch(
          setUser({
            id,
            role: usergroup,
            name,
            permissions,
            enabled2FA: enabled2FA === 1,
            isAuthenticated: false,
            mobileNo: mobileNo,
            token: token
          })
        );
        return navigate("/2fa", { replace: true });
      }
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", id);
      localStorage.setItem("username", name);
      dispatch(
        setUser({
          id,
          role: usergroup,
          name,
          permissions,
          enabled2FA: enabled2FA === 1,
          isAuthenticated: true,
          mobileNo: mobileNo,
          token: token
        })
      );
      dispatch(ChangeTab({ currenttab: "Dashboard" }));
      Toast.fire({
        icon: "success",
        title: "Logged in successfully",
        customClass: "swalpopup",
        timer: 1500,
        width: 330,
      });
      return navigate("/dashboard", { replace: true });
    },
    onError: (data) => {
      controls.start("detecterror");
    },
  });

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
    mutation.mutate(data);
  };

  return (
    <motion.div variants={variants} animate={controls}>
      <FormContainer
        header="Login to your account"
        multistep={false}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <FormField
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
        </Box>
      </FormContainer>
    </motion.div>
  );
};

export default Login;
