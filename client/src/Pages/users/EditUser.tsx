import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SubmitButton from "../../components/form/SubmitButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormField from "../../components/form/FormField";
import SelectDropdown from "../../components/form/SelectDropdown";
import MultiStepNavigation from "../../components/form/MultiStepNavigation";
import {
  SelectValidation,
  EmailValidation,
  UsernameValidation,
  PhoneNoValidation,
  PasswordValidation,
} from "../../utils/FormValidation";
import { Option, Company, UserGroup, NotiGroup } from "../../utils/CommonTypes";
import GetCompanies from "../../api/company/GetCompanies";
import GetUserGroups from "../../api/usergroup/GetUserGroups";
import GetNotificationGroups from "../../api/notificationgroup/GetNotificationGroups";
import PostUser from "../../api/user/PostUser";

interface FormValues {
  name: string;
  email: string;
  password: string;
  mobileno: string;
  company: number;
  usergroup: number;
  notificationgroups: number;
}

const EditUser: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // const mutation = useMutation(async (formData: FormValues) => {
  //   return axios.post(`http://localhost:5000/api/user`, formData, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  // });

  const mutation = useMutation(PostUser);

  const onSubmit = (data: FormValues) => {
    console.log("The data is ", data)
    mutation.mutate(data, { onSuccess: () => navigate("/users") });
  };

  // const GetCompanies = async () => {
  //   const result = await axios.get(`http://localhost:5000/api/companies`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   return result;
  // };

  // const GetUserGroups = async () => {
  //   const result = await axios.get(`http://localhost:5000/api/usergroups`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   return result;
  // };

  // const GetNotificationGroups = async () => {
  //   const result = await axios.get(
  //     `http://localhost:5000/api/notificationgroups`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );
  //   return result;
  // };

  const Companies = () => {
    const { isLoading, error, data } = useQuery("companies", GetCompanies);

    const companyoptions: Option[] = [];

    if (!error && !isLoading) {
      data.data.forEach((company: Company) => {
        companyoptions.push({
          text: company.CompanyName,
          value: company.CompanyID,
        });
      });
    }

    return companyoptions;
  };

  const UserGroups = () => {
    const { isLoading, error, data } = useQuery("usergroups", GetUserGroups);

    const usergroupoptions: Option[] = [];

    if (!error && !isLoading) {
      data.data.forEach((usergroup: UserGroup) => {
        usergroupoptions.push({
          text: usergroup.UserGroupName,
          value: usergroup.UserGroupID,
        });
      });
    }

    return usergroupoptions;
  };

  const NotificationGroups = () => {
    const { isLoading, error, data } = useQuery(
      "notificationgroups",
      GetNotificationGroups
    );

    const notigroupoptions: Option[] = [];

    if (!error && !isLoading) {
      data.data.forEach((notigroup: NotiGroup) => {
        notigroupoptions.push({
          text: notigroup.NotiGroupName,
          value: JSON.stringify({NotiGroupID: notigroup.NotiGroupID}),
        });
      });
    }

    return notigroupoptions;
  };

  const StepOne = () => {
    return(
      <>
              <FormField
                label="Username"
                name="name"
                type="text"
                register={register}
                errormsg={errors.name?.message}
                rules={UsernameValidation}
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                register={register}
                errormsg={errors.email?.message}
                rules={EmailValidation}
              />
              <FormField
                label="Phone No"
                name="mobileno"
                type="text"
                register={register}
                errormsg={errors.mobileno?.message}
                rules={PhoneNoValidation}
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                register={register}
                errormsg={errors.password?.message}
                rules={PasswordValidation}
              />
              <SelectDropdown
                label="Company"
                name="company"
                options={Companies()}
                register={register}
                errormsg={errors.company?.message}
                rules={SelectValidation}
                multiselect={false}
                defaultoption="Choose a company"
              />
              <div className="formnavigationcontainer">
              <button className="formnavigation" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button
                className="nextbutton"
                onClick={() => setStep(step +1)}
              >
                Next <NavigateNextIcon style={{marginRight: -10, marginLeft: -7}}/>
              </button>
              </div>
            </>
    )
  }
  
  const StepTwo = () => {
    return (
    <>
    <SelectDropdown
      label="User Group"
      name="usergroup"
      options={UserGroups()}
      register={register}
      errormsg={errors.usergroup?.message}
      rules={SelectValidation}
      multiselect={false}
      defaultoption="Choose a User Group"
    />
    <SelectDropdown
      label="Notification Groups"
      name="notificationgroups"
      options={NotificationGroups()}
      register={register}
      errormsg={errors.notificationgroups?.message}
      multiselect={true}
      defaultoption="Choose a Notification Group"
    />
    {mutation.isError && axios.isAxiosError(mutation.error) ? (
      <ErrorAlert error={mutation.error} />
    ) : null}
    <div className="formnavigationcontainer">
    <button className="formnavigation" onClick={() => setStep(step - 1)}>
      Back
    </button>
    <SubmitButton text="Submit" loading={mutation.isLoading} multipart={true} />
    </div>
  </>
  )
  }

  return (
    <Container className="multiformcontainer shadow">
      <h2 className="formheader">Create User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 ? (
          <StepOne />
        ) : (
          <StepTwo />
        )}
        {/* <MultiStepNavigation step={step} nextStep={NextStep} prevStep={PrevStep} mutation={mutation} /> */}
      </form>
    </Container>
  );
};
export default EditUser;
