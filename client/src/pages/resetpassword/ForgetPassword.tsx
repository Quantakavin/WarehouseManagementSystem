import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormContainer from "../../components/form/FormContainer";
import FormField from "../../components/form/FormField";
import SubmitButton from "../../components/form/SubmitButton";
import { EmailValidation } from "../../utils/FormValidation";
import { ForgotPassword } from "../../api/ResetPasswordDB";
import { Toast } from "../../components/alerts/SweetAlert";
import { Box, Link } from "@mui/material";

interface FormValues {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onSubmit" });

  const mutation = useMutation(ForgotPassword, {
    onSuccess: (data) => {
      Toast.fire({
        icon: "info",
        title: "Please check your email for the link to reset your password.",
        customClass: "swalpopup",
        timer: 3000,
        width: 590,
      });
      navigate("/");
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
        header="Password Recovery"
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

        {mutation.isError && axios.isAxiosError(mutation.error) ? (
          <ErrorAlert error={mutation.error} />
        ) : null}
        <Box className="flexcontainer" style={{ marginTop: 20 }}>
          <SubmitButton
            text="Send email"
            loading={mutation.isLoading}
            multipart={false}
          />
        </Box>

        <Link
          onClick={() => {
            navigate("/");
          }}
          underline="hover"
          sx={{
            textAlign: "center",
            display: "block",
            ml: "auto",
            mr: "auto",
            pt: 2,
          }}
        >
          Back to login
        </Link>
      </FormContainer>
    </motion.div>
  );
};

export default ForgetPassword;
