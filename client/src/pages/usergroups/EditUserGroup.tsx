import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { GetFeatureRights, GetFeatures } from "../../api/FeatureDB";
import { GetUserGroup, UpdateUserGroup } from "../../api/UserGroupDB";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../../Components/alerts/SweetAlert";
import ErrorAlert from "../../Components/form/ErrorAlert";
import FormContainer from "../../Components/form/FormContainer";
import FormField from "../../Components/form/FormField";
import FormTextArea from "../../Components/form/FormTextArea";
import MultiSelectDropdown from "../../Components/form/MultiSelectDropdown";
import SelectedList from "../../Components/form/SelectedList";
import SubmitButton from "../../Components/form/SubmitButton";
import { Feature, FeatureRight, Option } from "../../utils/CommonTypes";
import {
  NameValidation,
  DescriptionValidation,
} from "../../utils/FormValidation";
import FormSteps from "../../Components/form/FormSteps";
import GeneralButton from "../../Components/buttons/GeneralButton";

interface FormValues {
  name: string;
  description: string;
  features?: any[];
}

const EditUserGroup: React.FC = () => {
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
          width: "400",
        });
        queryClient.invalidateQueries("usergroups");
        queryClient.invalidateQueries("filterusergroups");
        queryClient.invalidateQueries("usergroupnames");
        queryClient.invalidateQueries(`usergroup${params.id}`);
        navigate(`/usergroup/${params.id}`);
      },
    });
  };

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

  const nextStep = () => {
    trigger(["name", "description"]).then(() => {
      if (!errors.name && !errors.description) {
        setStep(step + 1);
      } else {
        controls.start("detecterror");
      }
    });
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

  const steps = ["Enter user group details", "Assign features to user group"];

  const icons = {
    1: <GroupAddIcon />,
    2: <FormatListBulletedIcon />,
  };

  return (
    <>
      <FormSteps steps={steps} activestep={step - 1} icons={icons} />
      <motion.div variants={variants} animate={controls}>
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
                  error={errors.name}
                  rules={NameValidation}
                />
                <FormTextArea
                  label="Description"
                  name="description"
                  register={register}
                  error={errors.description}
                  setValue={setValue}
                  watch={watch}
                  defaultvalue={UserGroupQuery.data.data[0].UserGroupDesc}
                  rules={DescriptionValidation}
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
      </motion.div>
    </>
  );
};
export default EditUserGroup;
