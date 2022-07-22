import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SubmitButton from "../../components/form/SubmitButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormField from "../../components/form/FormField";
import { NameValidation } from "../../utils/FormValidation";
import {
  GetUserGroup,
  PostUserGroup,
  UpdateUserGroup,
} from "../../api/UserGroupDB";
import FormContainer from "../../components/form/FormContainer";
import FormTextArea from "../../components/form/FormTextArea";
import { GetFeatures, GetFeatureRights } from "../../api/FeatureDB";
import { Option, Feature, FeatureRight } from "../../utils/CommonTypes";
import { Toast } from "../../components/alerts/SweetAlert";
import SelectDropdown from "../../components/form/SelectDropdown";
import MultiSelectDropdown from "../../components/form/MultiSelectDropdown";
import { FeaturedVideo } from "@mui/icons-material";
import SelectedList from "../../components/form/SelectedList";

interface FormValues {
  name: string;
  description: string;
  features?: any[];
}

const EditUserGroup: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [step, setStep] = useState<number>(1);
  const params = useParams();
  const [userGroup, setUserGroup] = useState<any>(null);
  const [featureOptions, setFeatureOptions] = useState<Option[]>([]);
  const [featureRightOptions, setFeatureRightOptions] = useState<Option[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [returnFeatures, setReturnFeatures] = useState<any[]>([]);

  const queryClient = useQueryClient();

  const UserGroupQuery = useQuery(
    [`usergroup${params.id}`, params.id],
    () => GetUserGroup(params.id),
    {
      onSuccess: (data) => {
        console.log(JSON.stringify(data.data[0].Features));
        setSelectedFeatures(
          data.data[0].Features.map((value) => {
            return value.FeatureID;
          })
        );
        setReturnFeatures(
          data.data[0].Features.map((returnfeature) => {
            return {
              FeatureID: returnfeature.FeatureID,
              FeatureRightID: returnfeature.FeatureRightID,
            };
          })
        );
        setUserGroup(data.data[0]);
      },
    }
  );

  const featuresQuery = useQuery("features", GetFeatures, {
    onSuccess: (data) => {
      const features: Option[] = [];
      data.data.forEach((feature: Feature) => {
        features.push({
          id: feature.FeatureID,
          text: feature.FeatureName,
          value: feature.FeatureID,
        });
      });
      setFeatureOptions(features);
    },
  });
  const featureRightsQuery = useQuery("featurerights", GetFeatureRights, {
    onSuccess: (data) => {
      const featurerights: Option[] = [];
      data.data.forEach((featureright: FeatureRight) => {
        featurerights.push({
          id: featureright.FeatureRightID,
          text: featureright.FeatureRight,
          value: featureright.FeatureRightID,
        });
      });
      setFeatureRightOptions(featurerights);
    },
  });

  const mutation = useMutation((data: FormValues) =>
    UpdateUserGroup(data, params.id)
  );

  const onSubmit = (data: FormValues) => {
    const postdata = data;
    postdata.features = returnFeatures;
    mutation.mutate(postdata, {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "User group updated successfully",
          customClass: "swalpopup",
          timer: 1500,
        });
        queryClient.invalidateQueries("usergroups");
        queryClient.invalidateQueries("filterusergroups");
        queryClient.invalidateQueries("usergroupnames");
        queryClient.invalidateQueries(`usergroup${params.id}`);
        navigate(`/usergroup/${params.id}`);
      },
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const selectFeature = (event: SelectChangeEvent<typeof selectedFeatures>) => {
    const {
      target: { value },
    } = event;
    let valuearray = [];
    if (typeof value === "string") {
      valuearray = value.split(",");
    } else {
      valuearray = value;
    }
    setSelectedFeatures(typeof value === "string" ? value.split(",") : value);
    const featurestoset = valuearray.map((feature) => {
      if (
        returnFeatures.some(
          (returnfeature) => returnfeature.FeatureID === feature
        )
      ) {
        return returnFeatures.find(
          (returnfeature) => returnfeature.FeatureID === feature
        );
      }
      return { FeatureID: feature, FeatureRightID: 1 };
    });
    setReturnFeatures(featurestoset);
  };

  const unselectFeature = (feature: string) => {
    setSelectedFeatures(
      selectedFeatures.filter((selectedfeature) => {
        return selectedfeature !== feature;
      })
    );
    setReturnFeatures(
      returnFeatures.filter((returnfeature) => {
        return returnfeature.FeatureID !== feature;
      })
    );
  };

  const assignFeatureRight = (
    event: SelectChangeEvent<number>,
    feature: string
  ) => {
    const {
      target: { value },
    } = event;
    setReturnFeatures(
      returnFeatures.map((returnfeature) => {
        const featurewithrights = returnfeature;
        if (featurewithrights.FeatureID === feature) {
          featurewithrights.FeatureRightID = value;
        }
        return featurewithrights;
      })
    );
  };

  const getFeatureName = (feature: string) => {
    return featuresQuery.data.data.find((data) => data.FeatureID === feature)
      .FeatureName;
  };

  // const StepOne = (
  //   <div className={step === 1 ? "showstep" : "hidestep"}>
  //     <FormField
  //       label="Name"
  //       name="name"
  //       type="text"
  //       register={register}
  //       defaultvalue={userGroup ? userGroup.UserGroupName : ""}
  //       errormsg={errors.name?.message}
  //       rules={NameValidation}
  //     />
  //     <FormTextArea
  //       label="Description"
  //       name="description"
  //       register={register}
  //       errormsg={errors.description?.message}
  //       defaultvalue={userGroup ? userGroup.UserGroupDesc : ""}
  //       rules={NameValidation}
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

  const SetDefaultOptions = (feature) => {
    let optiontoset = featureRightOptions[0]?.value;
    if (UserGroupQuery.isSuccess) {
      for (let i = 0; i < UserGroupQuery.data.data[0].Features.length; i++) {
        if (UserGroupQuery.data.data[0].Features[i].FeatureID === feature) {
          optiontoset = UserGroupQuery.data.data[0].Features[i].FeatureRightID;
        }
      }
    }
    return optiontoset;
  };

  // const StepTwo = (
  //   <div className={step === 2 ? "showstep" : "hidestep"}>
  //     <MultiSelectDropdown
  //       name="features"
  //       label="Features"
  //       selectedValues={selectedFeatures}
  //       changeSelectedValues={selectFeature}
  //       placeholder="Select Features..."
  //       options={featureOptions}
  //     />
  //     {selectedFeatures.length > 0 && (

  //       <SelectedList
  //         getname={getFeatureName}
  //         label="Feature List"
  //         selectedValues={selectedFeatures}
  //         unselect={unselectFeature}
  //         select={assignFeatureRight}
  //         options={featureRightOptions}
  //         defaultOptions={SetDefaultOptions}
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
      header="Edit User Group"
      multistep
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      {UserGroupQuery.isSuccess && featuresQuery.isSuccess && (
        <>
          {/* Step One */}
          <div className={step === 1 ? "showstep" : "hidestep"}>
            <FormField
              label="Name"
              name="name"
              type="text"
              register={register}
              defaultvalue={UserGroupQuery.data.data[0].UserGroupName}
              errormsg={errors.name?.message}
              rules={NameValidation}
            />
            <FormTextArea
              label="Description"
              name="description"
              register={register}
              errormsg={errors.description?.message}
              defaultvalue={UserGroupQuery.data.data[0].UserGroupDesc}
              rules={NameValidation}
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
                Next{" "}
                <NavigateNextIcon
                  style={{ marginRight: -10, marginLeft: -7 }}
                />
              </button>
            </div>
          </div>
          {/* Step Two */}
          <div className={step === 2 ? "showstep" : "hidestep"}>
            <MultiSelectDropdown
              name="features"
              label="Features"
              selectedValues={selectedFeatures}
              changeSelectedValues={selectFeature}
              placeholder="Select Features..."
              options={featureOptions}
            />
            {selectedFeatures.length > 0 && (
              <SelectedList
                getname={getFeatureName}
                label="Feature List"
                selectedValues={selectedFeatures}
                unselect={unselectFeature}
                select={assignFeatureRight}
                options={featureRightOptions}
                defaultOptions={SetDefaultOptions}
              />
            )}

            {mutation.isError && axios.isAxiosError(mutation.error) ? (
              <ErrorAlert error={mutation.error} />
            ) : null}
            <div className="formnavigationcontainer">
              <button
                className="formnavigation"
                onClick={prevStep}
                type="button"
              >
                <NavigateBeforeIcon
                  style={{ marginRight: -7, marginLeft: -10 }}
                />{" "}
                Back
              </button>
              <SubmitButton
                text="Submit"
                loading={mutation.isLoading}
                multipart
              />
            </div>
          </div>
        </>
      )}
    </FormContainer>
  );
};
export default EditUserGroup;
