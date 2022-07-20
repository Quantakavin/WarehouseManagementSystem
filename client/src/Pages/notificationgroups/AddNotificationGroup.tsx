import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SubmitButton from "../../components/form/SubmitButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormField from "../../components/form/FormField";
import { NameValidation, SelectValidation } from "../../utils/FormValidation";
import { PostUserGroup } from "../../api/UserGroupDB";
import FormContainer from "../../components/form/FormContainer";
import FormTextArea from "../../components/form/FormTextArea";
import { GetFeatures, GetFeatureRights } from "../../api/FeatureDB";
import { Option, Feature, FeatureRight, Company, NotiFeature, NotiType } from "../../utils/CommonTypes";
import { Toast } from "../../components/alerts/SweetAlert";
import MultiSelectDropdown from "../../components/form/MultiSelectDropdown";
import SelectedList from "../../components/form/SelectedList";
import { GetCompanies } from "../../api/CompanyDB";
import SelectDropdown from "../../components/form/SelectDropdown";
import { GetNotificationFeatures, GetNotificationTypes } from "../../api/NotificationFeatureDB";
import { PostNotificationGroup } from "../../api/NotificationGroupDB";

interface FormValues {
  name: string;
  description: string;
  company: number;
  notifications?: any[];
}

const AddNotificationGroup: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [step, setStep] = useState<number>(1);
  const [companyOptions, setCompanyOptions] = useState<Option[]>([]);
  const [notiFeatureOptions, setNotiFeatureOptions] = useState<Option[]>([]);
  const [notiTypeOptions, setNotiTypeOptions] = useState<Option[]>([]);
  const [selectedNotiFeatures, setSelectedNotiFeatures] = useState<string[]>([]);
  const [returnNotiFeatures, setReturnNotiFeatures] = useState<any[]>([]);

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

  const notiFeaturesQuery = useQuery("notificationfeatures", GetNotificationFeatures, {
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
    }
  });
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
    }
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
          timer: 1500
        });
        navigate("/notificationgroups");
      },
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const selectNotiFeature = (event: SelectChangeEvent<typeof selectedNotiFeatures>) => {
    const {
      target: { value },
    } = event;
    let valuearray = [];
    if (typeof value === "string") {
      valuearray = value.split(",");
    } else {
      valuearray = value;
    }
    setSelectedNotiFeatures(typeof value === "string" ? value.split(",") : value);
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
    ).NotiFeature
  }

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
        errormsg={errors.name?.message}
        rules={NameValidation}
      />
      <FormTextArea
        label="Description"
        name="description"
        register={register}
        errormsg={errors.description?.message}
        rules={NameValidation}
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
        <SubmitButton text="Submit" loading={mutation.isLoading} multipart />
      </div>
    </div>
      <pre>{JSON.stringify(returnNotiFeatures)}</pre>
    </FormContainer>
  );
};
export default AddNotificationGroup; 