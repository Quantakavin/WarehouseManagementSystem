import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { GetCompanies } from "../../api/CompanyDB";
import { GetNotificationGroups } from "../../api/NotificationGroupDB";
import { GetUser, UpdateUser } from "../../api/UserDB";
import { GetUserGroups } from "../../api/UserGroupDB";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../../components/alerts/SweetAlert";
import GeneralButton from "../../components/buttons/GeneralButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormContainer from "../../components/form/FormContainer";
import FormField from "../../components/form/FormField";
import MultiSelectDropdown from "../../components/form/MultiSelectDropdown";
import SelectDropdown from "../../components/form/SelectDropdown";
import SubmitButton from "../../components/buttons/SubmitButton";
import { Company, NotiGroup, Option, UserGroup } from "../../utils/CommonTypes";
import {
  EmailValidation,
  PasswordValidation,
  PhoneNoValidation,
  SelectValidation,
  UsernameValidation,
} from "../../utils/FormValidation";
import FormSteps from "../../components/form/FormSteps";

interface FormValues {
  name: string;
  email: string;
  password: string;
  mobileno: string;
  company: number;
  usergroup: number;
  notificationgroups: string[];
}

const EditUser: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userrole = useAppSelector(selectRole);
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    }
  }, []);
  const [companyOptions, setCompanyOptions] = useState<Option[]>([]);
  const [userGroupOptions, setUserGroupOptions] = useState<Option[]>([]);
  const [notiGroupOptions, setNotiGroupOptions] = useState<Option[]>([]);
  const [step, setStep] = useState<number>(1);
  // const [user, setUser] = useState<any>(null);
  const [selectedNotiGroups, setSelectedNotiGroups] = useState<string[]>([]);
  const [returnNotiGroups, setReturnNotiGroups] = useState<any[]>([]);
  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ mode: "all" });
  const UserQuery = useQuery(
    [`user${params.id}`, params.id],
    () => GetUser(params.id),
    {
      onSuccess: (data) => {
        // setUser(data.data[0]);
        setSelectedNotiGroups(
          data.data[0].NotificationGroups.map((value) => {
            return value.NotiGroupID;
          })
        );
        setReturnNotiGroups(
          data.data[0].NotificationGroups.map((value) => {
            return { NotiGroupID: value.NotiGroupID };
          })
        );
      },
    }
  );
  useQuery(
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
  useQuery("usergroups", GetUserGroups, {
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
  useQuery("notificationgroups", GetNotificationGroups, {
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
  });

  const mutation = useMutation((data: FormValues) =>
    UpdateUser(data, params.id)
  );

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
    const postdata = data;
    postdata.notificationgroups = returnNotiGroups;
    mutation.mutate(data, {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "User updated successfully",
          customClass: "swalpopup",
          timer: 1500,
        });
        queryClient.invalidateQueries(`user${params.id}`);
        queryClient.invalidateQueries(`users`);
        queryClient.invalidateQueries("usernames");
        navigate(`/user/${params.id}`);
      },
    });
  };

  const nextStep = () => {
    trigger(["name", "email", "mobileno", "password", "company"]).then(() => {
      if (
        isDirty &&
        !errors.name &&
        !errors.email &&
        !errors.mobileno &&
        !errors.password &&
        !errors.company
      ) {
        setStep(step + 1);
      } else {
        controls.start("detecterror");
      }
    });
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

  const steps = ["Enter user details", "Assign user to groups"];

  const icons = {
    1: <ManageAccountsIcon />,
    2: <GroupAddIcon />,
  };

  return (
    <>
      <FormSteps steps={steps} activestep={step - 1} icons={icons} />

      <motion.div
        variants={variants}
        animate={controls}
        // exit={{ x: "-100vw", opacity: 0 }}
        // transition={{ duration: 5 }}
      >
        <FormContainer
          header="Edit User"
          multistep
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          {UserQuery.isSuccess && (
            <>
              {/* Step One */}
              <div className={step === 1 ? "showstep" : "hidestep"}>
                <FormField
                  label="Username"
                  name="name"
                  type="text"
                  register={register}
                  defaultvalue={UserQuery.data.data[0].Username}
                  error={errors.name}
                  rules={UsernameValidation}
                />
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  register={register}
                  defaultvalue={UserQuery.data.data[0].Email}
                  error={errors.email}
                  rules={EmailValidation}
                />
                <FormField
                  label="Phone No"
                  name="mobileno"
                  type="text"
                  register={register}
                  defaultvalue={UserQuery.data.data[0].MobileNo}
                  error={errors.mobileno}
                  rules={PhoneNoValidation}
                />
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  register={register}
                  error={errors.password}
                  rules={PasswordValidation}
                />
                <SelectDropdown
                  label="Company"
                  name="company"
                  options={companyOptions}
                  register={register}
                  error={errors.company}
                  rules={SelectValidation}
                  defaultoption={UserQuery.data.data[0].CompanyID}
                />
                <div className="formnavigationcontainer">
                  <button
                    className="formnavigation"
                    onClick={() => navigate(-1)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <GeneralButton
                    text={
                      <>
                        Next{" "}
                        <NavigateNextIcon
                          style={{ marginRight: -10, marginLeft: -1 }}
                        />
                      </>
                    }
                    clickfunction={nextStep}
                  />
                </div>
              </div>
              {/* Step Two */}
              <div className={step === 2 ? "showstep" : "hidestep"}>
                <SelectDropdown
                  label="User Group"
                  name="usergroup"
                  options={userGroupOptions}
                  register={register}
                  error={errors.usergroup}
                  rules={SelectValidation}
                  defaultoption={UserQuery.data.data[0].UserGroupID}
                />

                <MultiSelectDropdown
                  name="notificationgroups"
                  label="Notification Groups"
                  selectedValues={selectedNotiGroups}
                  changeSelectedValues={selectNotiGroup}
                  placeholder="Select Notification Groups..."
                  options={notiGroupOptions}
                />

                {mutation.isError && axios.isAxiosError(mutation.error) ? (
                  <div style={{ marginTop: 25, marginBottom: -15 }}>
                    <ErrorAlert error={mutation.error} />
                  </div>
                ) : null}
                <div className="formnavigationcontainer">
                  <button
                    className="formnavigation"
                    onClick={prevStep}
                    type="button"
                  >
                    Back
                  </button>
                  <SubmitButton text="Submit" loading={mutation.isLoading} />
                </div>
              </div>
            </>
          )}
        </FormContainer>
      </motion.div>
    </>
  );
};
export default EditUser;
