import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { GetCompanies } from "../../api/CompanyDB";
import {
    GetNotificationFeatures,
    GetNotificationTypes
} from "../../api/NotificationFeatureDB";
import { PostNotificationGroup } from "../../api/NotificationGroupDB";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../../components/alerts/SweetAlert";
import GeneralButton from "../../components/buttons/GeneralButton";
import SubmitButton from "../../components/buttons/SubmitButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormContainer from "../../components/form/FormContainer";
import FormField from "../../components/form/FormField";
import FormSteps from "../../components/form/FormSteps";
import FormTextArea from "../../components/form/FormTextArea";
import MultiSelectDropdown from "../../components/form/MultiSelectDropdown";
import SelectDropdown from "../../components/form/SelectDropdown";
import SelectedList from "../../components/form/SelectedList";
import {
    Company,
    NotiFeature,
    NotiType,
    Option
} from "../../utils/CommonTypes";
import { DescriptionValidation, NameValidation, SelectValidation } from "../../utils/FormValidation";

interface FormValues {
  name: string;
  description: string;
  company: number;
  notifications?: any[];
}

const AddNotificationGroup: React.FC = () => {
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole);
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    }
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ mode: "all" });
  const [step, setStep] = useState<number>(1);
  const [companyOptions, setCompanyOptions] = useState<Option[]>([]);
  const [notiFeatureOptions, setNotiFeatureOptions] = useState<Option[]>([]);
  const [notiTypeOptions, setNotiTypeOptions] = useState<Option[]>([]);
  const [selectedNotiFeatures, setSelectedNotiFeatures] = useState<string[]>(
    []
  );
  const [returnNotiFeatures, setReturnNotiFeatures] = useState<any[]>([]);
  const queryClient = useQueryClient();

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

  const notiFeaturesQuery = useQuery(
    "notificationfeatures",
    GetNotificationFeatures,
    {
      onSuccess: (data) => {
        const notificationfeatures: Option[] = [];
        data.data.forEach((feature: NotiFeature) => {
          notificationfeatures.push({
            id: feature.NotiFeatureID,
            text: feature.NotiFeature,
            value: feature.NotiFeatureID,
          });
        });
        setNotiFeatureOptions(notificationfeatures);
      },
    }
  );
  const notiTypesQuery = useQuery("notificationtypes", GetNotificationTypes, {
    onSuccess: (data) => {
      const notificationtypes: Option[] = [];
      data.data.forEach((featureright: NotiType) => {
        notificationtypes.push({
          id: featureright.NotiTypeID,
          text: featureright.NotiType,
          value: featureright.NotiTypeID,
        });
      });
      setNotiTypeOptions(notificationtypes);
    },
  });

  const mutation = useMutation(PostNotificationGroup);

  const onSubmit = (data: FormValues) => {
    const postdata = data;
    postdata.notifications = returnNotiFeatures;
    mutation.mutate(postdata, {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "Notification group created successfully",
          customClass: "swalpopup",
          timer: 1500,
        });
        queryClient.invalidateQueries("notificationgroups");
        queryClient.invalidateQueries("filternotificationgroups");
        queryClient.invalidateQueries("notificationgroupnames");
        navigate("/notificationgroups");
      },
      onError: () => {
        controls.start("detecterror");
      }
    });
  };

  const controls = useAnimation();

  const variants = {
    detecterror: () => ({
      //rotate: [-1, 1.3, 0],
      x: [10, -10, 0, 10, -10, 0],
      transition: {
        duration: 0.4
      }
    })
  };


  const nextStep = () => {
    trigger(["name", "description", "company"]).then(() => {
      if (
        isDirty &&
        !errors.name &&
        !errors.description &&
        !errors.company
      ) {
        setStep(step + 1);
      } else {
        controls.start("detecterror")
      }
    });
    //setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const selectNotiFeature = (
    event: SelectChangeEvent<typeof selectedNotiFeatures>
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
    setSelectedNotiFeatures(
      typeof value === "string" ? value.split(",") : value
    );
    const notifeaturestoset = valuearray.map((notifeature) => {
      if (
        returnNotiFeatures.some(
          (returnnotifeature) => returnnotifeature.NotiFeatureID === notifeature
        )
      ) {
        return returnNotiFeatures.find(
          (returnnotifeature) => returnnotifeature.NotiFeatureID === notifeature
        );
      }
      return { NotiFeatureID: notifeature, NotiTypeID: 1 };
    });
    setReturnNotiFeatures(notifeaturestoset);
  };

  const unselectNotiFeature = (notifeature: string) => {
    setSelectedNotiFeatures(
      selectedNotiFeatures.filter((selectednotifeature) => {
        return selectednotifeature !== notifeature;
      })
    );
    setReturnNotiFeatures(
      returnNotiFeatures.filter((returnnotifeature) => {
        return returnnotifeature.NotiFeatureID !== notifeature;
      })
    );
  };

  const assignNotiType = (
    event: SelectChangeEvent<number>,
    notifeature: string
  ) => {
    const {
      target: { value },
    } = event;
    setReturnNotiFeatures(
      returnNotiFeatures.map((returnnotifeature) => {
        const notifeaturewithtype = returnnotifeature;
        if (notifeaturewithtype.NotiFeatureID === notifeature) {
          notifeaturewithtype.NotiTypeID = value;
        }
        return notifeaturewithtype;
      })
    );
  };

  const getNotiFeatureName = (notifeature: string) => {
    return notiFeaturesQuery.data.data.find(
      (data) => data.NotiFeatureID === notifeature
    ).NotiFeature;
  };

  const steps = ["Enter notification group details", "Assign notification features"];

  const icons = {
    1: <NotificationAddIcon />,
    2: <FormatListBulletedIcon />
  };

  // const StepOne = (
  //   <div className={step === 1 ? "showstep" : "hidestep"}>
  //     <FormField
  //       label="Name"
  //       name="name"
  //       type="text"
  //       register={register}
  //       errormsg={errors.name?.message}
  //       rules={NameValidation}
  //     />
  //     <FormTextArea
  //       label="Description"
  //       name="description"
  //       register={register}
  //       errormsg={errors.description?.message}
  //       rules={NameValidation}
  //     />
  //     <SelectDropdown
  //       label="Company"
  //       name="company"
  //       options={companyOptions}
  //       register={register}
  //       errormsg={errors.company?.message}
  //       rules={SelectValidation}
  //       placeholder="Choose a company"
  //     />
  //     <div className="formnavigationcontainer">
  //       <button
  //         className="formnavigation"
  //         onClick={() => navigate(-1)}
  //         type="button"
  //       >
  //         Cancel
  //       </button>
  //       <button className="nextbutton" onClick={nextStep} type="button">
  //         Next <NavigateNextIcon style={{ marginRight: -10, marginLeft: -7 }} />
  //       </button>
  //     </div>
  //   </div>
  // );

  // const StepTwo = (
  //   <div className={step === 2 ? "showstep" : "hidestep"}>
  //     <MultiSelectDropdown
  //       name="notification features"
  //       label="Permitted Notifications"
  //       selectedValues={selectedNotiFeatures}
  //       changeSelectedValues={selectNotiFeature}
  //       placeholder="Select Permitted Notifications..."
  //       options={notiFeatureOptions}
  //     />

  //     {selectedNotiFeatures.length > 0 && (

  //       <SelectedList
  //         getname={getNotiFeatureName}
  //         label="Feature List"
  //         selectedValues={selectedNotiFeatures}
  //         unselect={unselectNotiFeature}
  //         select={assignNotiType}
  //         options={notiTypeOptions}
  //       />
  //     )}

  //     {mutation.isError && axios.isAxiosError(mutation.error) ? (
  //       <ErrorAlert error={mutation.error} />
  //     ) : null}
  //     <div className="formnavigationcontainer">
  //       <button className="formnavigation" onClick={prevStep} type="button">
  //         <NavigateBeforeIcon style={{ marginRight: -7, marginLeft: -10 }} />{" "}
  //         Back
  //       </button>
  //       <SubmitButton text="Submit" loading={mutation.isLoading} multipart />
  //     </div>
  //   </div>
  // );

  return (
    <>
      <FormSteps steps={steps} activestep={step - 1} icons={icons} />
      <motion.div
        variants={variants}
        animate={controls}
      >
        <FormContainer
          header="Create Notification Group"
          multistep
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          {/* Step One */}
          <div className={step === 1 ? "showstep" : "hidestep"}>
            <FormField
              label="Name"
              name="name"
              type="text"
              register={register}
              error={errors.name}
              rules={NameValidation}
            />
            <FormTextArea
              label="Description"
              name="description"
              register={register}
              error={errors.description}
              rules={DescriptionValidation}
              setValue={setValue}
              watch={watch}
              defaultvalue=""
            />
            <SelectDropdown
              label="Company"
              name="company"
              options={companyOptions}
              register={register}
              error={errors.company}
              rules={SelectValidation}
              defaultoption=""
            />
            <div className="formnavigationcontainer">
              <button
                className="formnavigation"
                onClick={() => navigate(-1)}
                type="button"
              >
                Cancel
              </button>
              <GeneralButton text={<>Next{" "}
                <NavigateNextIcon
                  style={{ marginRight: -10, marginLeft: -1 }}
                /></>}
                clickfunction={nextStep}
              />
            </div>
          </div>
          {/* Step Two */}
          <div className={step === 2 ? "showstep" : "hidestep"}>
            <MultiSelectDropdown
              name="notification features"
              label="Permitted Notifications"
              selectedValues={selectedNotiFeatures}
              changeSelectedValues={selectNotiFeature}
              placeholder="Select Permitted Notifications..."
              options={notiFeatureOptions}
            />

            {selectedNotiFeatures.length > 0 && (
              <SelectedList
                getname={getNotiFeatureName}
                label="Feature List"
                selectedValues={selectedNotiFeatures}
                unselect={unselectNotiFeature}
                select={assignNotiType}
                options={notiTypeOptions}
              />
            )}

            {mutation.isError && axios.isAxiosError(mutation.error) ? (
              <ErrorAlert error={mutation.error} />
            ) : null}
            <div className="formnavigationcontainer">
              <button className="formnavigation" onClick={prevStep} type="button">
                <NavigateBeforeIcon style={{ marginRight: -7, marginLeft: -10 }} />{" "}
                Back
              </button>
              <SubmitButton text="Submit" loading={mutation.isLoading} />
            </div>
          </div>
        </FormContainer>
      </motion.div>
    </>
  );
};
export default AddNotificationGroup;
