import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { GetFeatureRights, GetFeatures } from "../../api/FeatureDB";
import { PostUserGroup } from "../../api/UserGroupDB";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../../components/alerts/SweetAlert";
import GeneralButton from "../../components/buttons/GeneralButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormContainer from "../../components/form/FormContainer";
import FormField from "../../components/form/FormField";
import FormTextArea from "../../components/form/FormTextArea";
import MultiSelectDropdown from "../../components/form/MultiSelectDropdown";
import SelectedList from "../../components/form/SelectedList";
import SubmitButton from "../../components/buttons/SubmitButton";
import { Feature, FeatureRight, Option } from "../../utils/CommonTypes";
import {
  NameValidation,
  DescriptionValidation,
} from "../../utils/FormValidation";
import FormSteps from "../../components/form/FormSteps";

interface FormValues {
  name: string;
  description: string;
  features?: any[];
}

const AddUserGroup: React.FC = () => {
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
  const [featureOptions, setFeatureOptions] = useState<Option[]>([]);
  const [featureRightOptions, setFeatureRightOptions] = useState<Option[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [returnFeatures, setReturnFeatures] = useState<any[]>([]);

  const queryClient = useQueryClient();

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

  const mutation = useMutation(PostUserGroup);

  const onSubmit = (data: FormValues) => {
    const postdata = data;
    postdata.features = returnFeatures;
    mutation.mutate(postdata, {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "User group created successfully",
          customClass: "swalpopup",
          timer: 1500,
        });
        queryClient.invalidateQueries("usergroups");
        queryClient.invalidateQueries("filterusergroups");
        queryClient.invalidateQueries("usergroupnames");
        navigate("/usergroups");
      },
      onError: () => {
        controls.start("detecterror");
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
      if (isDirty && !errors.name && !errors.description) {
        setStep(step + 1);
      } else {
        controls.start("detecterror");
      }
    });
    // setStep(step + 1);
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

  const steps = ["Enter user group details", "Assign features to user group"];

  const icons = {
    1: <GroupAddIcon />,
    2: <FormatListBulletedIcon />,
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
          header="Create User Group"
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
              <SubmitButton text="Submit" loading={mutation.isLoading} />
            </div>
          </div>
        </FormContainer>
      </motion.div>
    </>
  );
};
export default AddUserGroup;
