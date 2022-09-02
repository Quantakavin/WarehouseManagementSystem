import { Box, Link } from "@mui/material";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { LoginUser } from "../../api/UserDB";
import { useAppDispatch } from "../../app/hooks";
import { removeUser, setUser } from "../../app/reducers/CurrentUserSlice";
import { setNotificationCount } from "../../app/reducers/NotificationSlice";
import { ChangeTab } from "../../app/reducers/SidebarSlice";
import { Toast } from "../../components/alerts/SweetAlert";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormContainer from "../../components/form/FormContainer";
import FormField from "../../components/form/FormField";
import SubmitButton from "../../components/form/SubmitButton";
import { SocketContext } from "../../context/socket";
import {
  EmailValidation,
  PasswordValidation,
} from "../../utils/FormValidation";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { emptyCart } = useCart();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onSubmit" });

  const controls = useAnimation();

  const mutation = useMutation(LoginUser, {
    onSuccess: (data) => {
      const {
        token,
        id,
        name,
        usergroup,
        permissions,
        enabled2FA,
        mobileNo,
        telegramid,
        unreadnotifications,
      } = data.data;

      if (enabled2FA === 1) {
        dispatch(removeUser());
        dispatch(
          setUser({
            id,
            role: usergroup,
            name,
            permissions,
            enabled2FA: enabled2FA === 1,
            isAuthenticated: false,
            mobileNo,
            token,
            telegramid,
          })
        );
        dispatch(
          setNotificationCount({
            notificationCount: unreadnotifications,
          })
        );
        return navigate("/2fa", { replace: true });
      }
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", id);
      localStorage.setItem("username", name);
      emptyCart();
      dispatch(
        setUser({
          id,
          role: usergroup,
          name,
          permissions,
          enabled2FA: enabled2FA === 1,
          isAuthenticated: true,
          mobileNo,
          token,
          telegramid,
        })
      );
      dispatch(
        setNotificationCount({
          notificationCount: unreadnotifications,
        })
      );
      socket.emit("login", { userid: id });
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
    onError: () => {
      controls.start("detecterror");
    },
  });

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

        <Link // eslint-disable-line jsx-a11y/anchor-is-valid
          onClick={() => {
            navigate("/forgetpassword");
          }}
          component="button"
          variant="body2"
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
