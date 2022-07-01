import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FormContainer from "../../components/form/FormContainer";
import SubmitButton from "../../components/form/SubmitButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormField from "../../components/form/FormField";
import SelectDropdown from "../../components/form/SelectDropdown";
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {
  SelectValidation,
  EmailValidation,
  UsernameValidation,
  PhoneNoValidation,
  PasswordValidation,
} from "../../utils/FormValidation";
import { Option, Company, UserGroup, NotiGroup } from "../../utils/CommonTypes";
// import GetCompanies from "../../api/company/GetCompanies";
// import GetUserGroups from "../../api/usergroup/GetUserGroups";
// import GetNotificationGroups from "../../api/notificationgroup/GetNotificationGroups";
// import PostUser from "../../api/user/PostUser";

import { GetCompanies } from "../../api/CompanyDB";
import { GetUserGroups } from "../../api/UserGroupDB";
import { GetNotificationGroups } from "../../api/NotificationGroupDB";
import { PostUser } from "../../api/UserDB";


interface FormValues {
  name: string;
  email: string;
  password: string;
  mobileno: string;
  company: number;
  usergroup: number;
  notificationgroups: number;
}

const AddUser: React.FC = () => {
  const [companyOptions, setCompanyOptions] = useState<Option[]>([]);
  const [userGroupOptions, setUserGroupOptions] = useState<Option[]>([]);
  const [notiGroupOptions, setNotiGroupOptions] = useState<Option[]>([]);
  const [step, setStep] = useState<number>(1);
  const [success, setSuccess] = useState<boolean>(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({mode: "all"});

  // const companiesQuery = useQuery("companies", GetCompanies);
  // const userGroupsQuery = useQuery("usergroups", GetUserGroups);
  // const notiGroupsQuery = useQuery("notificationgroups", GetNotificationGroups);

  const companiesQuery = useQuery("companies", GetCompanies);
  const userGroupsQuery = useQuery("usergroups", GetUserGroups);
  const notiGroupsQuery = useQuery("notificationgroups", GetNotificationGroups);

  useEffect(() => {
    const companies: Option[] = [];
    if (!companiesQuery.error && !companiesQuery.isLoading) {
      companiesQuery.data.data.forEach((company: Company) => {
        companies.push({
          id: company.CompanyID,
          text: company.CompanyName,
          value: company.CompanyID,
        });
      });
    }
    setCompanyOptions(companies);

    const usergroups: Option[] = [];
    if (!userGroupsQuery.error && !userGroupsQuery.isLoading) {
      userGroupsQuery.data.data.forEach((usergroup: UserGroup) => {
        usergroups.push({
          id: usergroup.UserGroupID,
          text: usergroup.UserGroupName,
          value: usergroup.UserGroupID,
        });
      });
    }
    setUserGroupOptions(usergroups);

    const notigroups: Option[] = [];
    if (!notiGroupsQuery.error && !notiGroupsQuery.isLoading) {
      notiGroupsQuery.data.data.forEach((notigroup: NotiGroup) => {
        notigroups.push({
          id: notigroup.NotiGroupID,
          text: notigroup.NotiGroupName,
          value: JSON.stringify({ NotiGroupID: notigroup.NotiGroupID }),
        });
      });
    }
    setNotiGroupOptions(notigroups);
  }, [companiesQuery.data, userGroupsQuery.data, notiGroupsQuery.data]);

  const mutation = useMutation(PostUser);

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, { onSuccess: () => navigate("/users") });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const StepOne = (
    <div className={step === 1 ? "showstep" : "hidestep"}>
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
        options={companyOptions}
        register={register}
        errormsg={errors.company?.message}
        rules={SelectValidation}
        multiselect={false}
        defaultoption="Choose a company"
      />
      <div className="formnavigationcontainer">
        <button
          className="formnavigation"
          onClick={() => navigate(-1)}
          type="button"
        >
          Cancel
        </button>
        <button className="nextbutton" onClick={nextStep} type="button">
          Next <NavigateNextIcon style={{ marginRight: -10, marginLeft: -7 }} />
        </button>
      </div>
    </div>
  );

  const StepTwo = (
    <div className={step === 2 ? "showstep" : "hidestep"}>
      <SelectDropdown
        label="User Group"
        name="usergroup"
        options={userGroupOptions}
        register={register}
        errormsg={errors.usergroup?.message}
        rules={SelectValidation}
        multiselect={false}
        defaultoption="Choose a User Group"
      />
      <SelectDropdown
        label="Notification Groups"
        name="notificationgroups"
        options={notiGroupOptions}
        register={register}
        errormsg={errors.notificationgroups?.message}
        multiselect
        defaultoption="Choose a Notification Group"
      />
      {mutation.isError && axios.isAxiosError(mutation.error) ? (
        <ErrorAlert error={mutation.error} />
      ) : null}
      <div className="formnavigationcontainer">
        <button className="formnavigation" onClick={prevStep} type="button">
          Back
        </button>
        <SubmitButton text="Submit" loading={mutation.isLoading} multipart />
      </div>
    </div>
  );

  return (
    <FormContainer header="Create User" multistep={true} handleSubmit={handleSubmit} onSubmit={onSubmit}>
        {StepOne}
        {StepTwo}
    </FormContainer>
  );
};
export default AddUser;
