import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SelectChangeEvent } from "@mui/material";
import FormContainer from "../../components/form/FormContainer";
import SubmitButton from "../../components/form/SubmitButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormField from "../../components/form/FormField";
import SelectDropdown from "../../components/form/SelectDropdown";
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
import MultiSelectDropdown from "../../components/form/MultiSelectDropdown";
import { Toast } from "../../components/alerts/SweetAlert";

interface FormValues {
  name: string;
  email: string;
  password: string;
  mobileno: string;
  company: number;
  usergroup: number;
  notificationgroups: string[];
}

const AddUser: React.FC = () => {
  const [companyOptions, setCompanyOptions] = useState<Option[]>([]);
  const [userGroupOptions, setUserGroupOptions] = useState<Option[]>([]);
  const [notiGroupOptions, setNotiGroupOptions] = useState<Option[]>([]);
  const [step, setStep] = useState<number>(1);
  const [selectedNotiGroups, setSelectedNotiGroups] = useState<string[]>([]);
  const [returnNotiGroups, setReturnNotiGroups] = useState<any[]>([]);
  const navigate = useNavigate();
  const {
    register,
    trigger,
    watch,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<FormValues>({ mode: "all" });

  // const companiesQuery = useQuery("companies", GetCompanies);
  // const userGroupsQuery = useQuery("usergroups", GetUserGroups);
  // const notiGroupsQuery = useQuery("notificationgroups", GetNotificationGroups);

  const companiesQuery = useQuery(
    "companies",
    GetCompanies,

    {
      onSuccess: (data) => {
        const companies: Option[] = [];
        data.data.forEach((company: Company) => {
          companies.push({
            id: company.CompanyID,
            text: company.CompanyName,
            value: company.CompanyID,
          });
        });
        setCompanyOptions(companies);
      },
    }
  );
  const userGroupsQuery = useQuery("usergroups", GetUserGroups, {
    onSuccess: (data) => {
      const usergroups: Option[] = [];
      data.data.forEach((usergroup: UserGroup) => {
        usergroups.push({
          id: usergroup.UserGroupID,
          text: usergroup.UserGroupName,
          value: usergroup.UserGroupID,
        });
      });
      setUserGroupOptions(usergroups);
    },
  });
  const notiGroupsQuery = useQuery(
    "notificationgroups",
    GetNotificationGroups,
    {
      onSuccess: (data) => {
        const notigroups: Option[] = [];
        data.data.forEach((notigroup: NotiGroup) => {
          notigroups.push({
            id: notigroup.NotiGroupID,
            text: notigroup.NotiGroupName,
            value: notigroup.NotiGroupID,
          });
        });
        setNotiGroupOptions(notigroups);
      },
    }
  );

  const mutation = useMutation(PostUser);

  const onSubmit = (data: FormValues) => {
    const postdata = data;
    postdata.notificationgroups = returnNotiGroups;
    mutation.mutate(data, { onSuccess: () => {
      Toast.fire({
        icon: "success",
        title: "User created successfully",
        customClass: "swalpopup",
        timer: 1500
      });
      navigate("/users")
    } }); 
  };

  const nextStep = () => {
    // trigger([
    //   "name",
    //   "email",
    //   "mobileno",
    //   "password",
    //   "company",
    // ])
    // console.log(isDirty)
    // console.log(dirtyFields)
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const selectNotiGroup = (
    event: SelectChangeEvent<typeof selectedNotiGroups>
  ) => {
    const {
      target: { value },
    } = event;
    let valuearray = [];
    if (typeof value === "string") {
      valuearray = value.split(",");
    } else {
      valuearray = value;
    }
    setSelectedNotiGroups(typeof value === "string" ? value.split(",") : value);
    const notigroupstoset = valuearray.map((notigroup) => {
      if (
        returnNotiGroups.some(
          (returnnotigroup) => returnnotigroup.NotiGroupID === notigroup
        )
      ) {
        return returnNotiGroups.find(
          (returnnotigroup) => returnnotigroup.NotiGroupID === notigroup
        );
      }
      return { NotiGroupID: notigroup };
    });
    setReturnNotiGroups(notigroupstoset);
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
        placeholder="Choose a company"
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
        placeholder="Choose a User Group"
      />

      <MultiSelectDropdown
        name="notificationgroups"
        label="Notification Groups"
        selectedValues={selectedNotiGroups}
        changeSelectedValues={selectNotiGroup}
        placeholder="Select Notification Groups..."
        options={notiGroupOptions}
      />

      {/* <SelectDropdown
        label="Notification Groups"
        name="notificationgroups"
        options={notiGroupOptions}
        register={register}
        errormsg={errors.notificationgroups?.message}
        multiselect
        defaultoption="Choose a Notification Group"
      /> */}
      {mutation.isError && axios.isAxiosError(mutation.error) ? (
        <div style={{ marginTop: 25, marginBottom: -15 }}>
          <ErrorAlert error={mutation.error} />
        </div>
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
    <FormContainer
      header="Create User"
      multistep
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      {StepOne}
      {StepTwo}
    </FormContainer>
  );
};
export default AddUser;
