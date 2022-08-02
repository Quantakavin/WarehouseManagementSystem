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
import { PasswordValidation } from "../../utils/FormValidation";
import { ResetPassword } from "../../api/ResetPasswordDB";
import { Toast } from "../../components/alerts/SweetAlert";
import { Link } from "@mui/material";

function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1,
    queryEnd = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&"),
    parms = {},
    i,
    n,
    v,
    nv;

  if (query === url || query === "") return;

  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=", 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);

    if (!parms.hasOwnProperty(n)) parms[n] = [];
    parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
}

const params = parseURLParams(window.location.href);

interface FormValues {
  token: string;
  email: string;
  password: string;
}

const ResetToNewPassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onSubmit" });

  const mutation = useMutation(ResetPassword, {
    onSuccess: (data) => {
      Toast.fire({
        icon: "success",
        title: "New password set",
        customClass: "swalpopup",
        timer: 3000,
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
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <motion.div variants={variants} animate={controls}>
      <FormContainer
        header="Reset Password"
        multistep={false}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <FormField
          label="Token"
          name="token"
          type="text"
          defaultvalue={params.token[0]}
          register={register}
          readOnly
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          defaultvalue={params.email[0]}
          register={register}
          readOnly
        />

        <FormField
          label="New Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          rules={PasswordValidation}
        />

        {mutation.isError && axios.isAxiosError(mutation.error) ? (
          <ErrorAlert error={mutation.error} />
        ) : null}
        <div className="flexcontainer" style={{ marginTop: 20 }}>
          <SubmitButton
            text="Confirm"
            loading={mutation.isLoading}
            multipart={false}
          />
        </div>

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

export default ResetToNewPassword;
