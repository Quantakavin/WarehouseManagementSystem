import React, { useState, useEffect } from "react";
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
  const [companyOptions, setCompanyOptions] = useState<Option[]>([]);
  const [userGroupOptions, setUserGroupOptions] = useState<Option[]>([]);
  const [notiGroupOptions, setNotiGroupOptions] = useState<Option[]>([]);
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const companyQuery = useQuery("companies", GetCompanies);
  const userGroupQuery = useQuery("usergroups", GetUserGroups);
  const notiGroupQuery = useQuery("notificationgroups", GetNotificationGroups);

  useEffect(() => {
    const companies: Option[] = [];
    if (!companyQuery.error && !companyQuery.isLoading) {
      companyQuery.data.data.forEach((company: Company) => {
        companies.push({
          text: company.CompanyName,
          value: company.CompanyID,
        });
      });
    }
    setCompanyOptions(companies);

    const usergroups: Option[] = [];
    if (!userGroupQuery.error && !userGroupQuery.isLoading) {
      userGroupQuery.data.data.forEach((usergroup: UserGroup) => {
        usergroups.push({
          text: usergroup.UserGroupName,
          value: usergroup.UserGroupID,
        });
      });
    }
    setUserGroupOptions(usergroups);

    const notigroups: Option[] = [];
    if (!notiGroupQuery.error && !notiGroupQuery.isLoading) {
      notiGroupQuery.data.data.forEach((notigroup: NotiGroup) => {
        notigroups.push({
          text: notigroup.NotiGroupName,
          value: JSON.stringify({ NotiGroupID: notigroup.NotiGroupID }),
        });
      });
    }
    setNotiGroupOptions(notigroups);
  }, [companyQuery.data, userGroupQuery.data, notiGroupQuery.data]);

  const mutation = useMutation(PostUser);

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, { onSuccess: () => navigate("/users") });
  };

  return (
    <Container className="multiformcontainer shadow">
      <h2 className="formheader">Edit User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 ? (
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
              options={companyOptions}
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
              <button className="nextbutton" onClick={() => setStep(step + 1)}>
                Next{" "}
                <NavigateNextIcon
                  style={{ marginRight: -10, marginLeft: -7 }}
                />
              </button>
            </div>
          </>
        ) : (
          <>
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
              <button
                className="formnavigation"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              <SubmitButton
                text="Update"
                loading={mutation.isLoading}
                multipart
              />
            </div>
          </>
        )}
      </form>
    </Container>
  );
};
export default EditUser;
