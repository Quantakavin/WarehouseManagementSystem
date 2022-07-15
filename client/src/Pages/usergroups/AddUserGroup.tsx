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
import { NameValidation } from "../../utils/FormValidation";
import { PostUserGroup } from "../../api/UserGroupDB";
import FormContainer from "../../components/form/FormContainer";
import FormTextArea from "../../components/form/FormTextArea";
import { GetFeatures, GetFeatureRights } from "../../api/FeatureDB";
import { Option, Feature, FeatureRight } from "../../utils/CommonTypes";
// import SelectDropdown from "../../components/form/SelectDropdown";

type UserGroupFeature = {
  FeatureID: string;
  FeatureRightID: string;
}

interface FormValues {
  name: string;
  description: string;
  features?: any[];
}

const AddUserGroup: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [step, setStep] = useState<number>(1);
  const [featureOptions, setFeatureOptions] = useState<Option[]>([]);
  const [featureRightOptions, setFeatureRightOptions] = useState<Option[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const featuresQuery = useQuery("features", GetFeatures);
  const featureRightsQuery = useQuery("featurerights", GetFeatureRights);

  useEffect(() => {
    const features: Option[] = [];
    if (!featuresQuery.error && !featuresQuery.isLoading) {
      featuresQuery.data.data.forEach((feature: Feature) => {
        features.push({
          id: feature.FeatureID,
          text: feature.FeatureName,
          value: feature.FeatureID,
        });
      });
    }
    setFeatureOptions(features);
    const featurerights: Option[] = [];
    if (!featureRightsQuery.error && !featureRightsQuery.isLoading) {
      featureRightsQuery.data.data.forEach((featureright: FeatureRight) => {
        featurerights.push({
          id: featureright.FeatureRightID,
          text: featureright.FeatureRight,
          value: featureright.FeatureRightID,
        });
      });
    }
    setFeatureRightOptions(featurerights);
  }, [featuresQuery.data]);

  const mutation = useMutation(PostUserGroup);

  const onSubmit = (data: FormValues) => {
    const datafeatures = selectedFeatures.map((selectedfeature) => {
      const parsedfeature = JSON.parse(selectedfeature);
      delete parsedfeature["FeatureName"];
      return parsedfeature;
    });
    const postdata = data;
    postdata.features = datafeatures;
    mutation.mutate(data, { onSuccess: () => navigate("/usergroups") });
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
    setSelectedFeatures(typeof value === "string" ? value.split(",") : value);
  };

  const unselectFeature = (feature: string) => {
    setSelectedFeatures(
      selectedFeatures.filter((selectedfeature) => {
        return selectedfeature !== feature;
      })
    );
  };

  const assignFeatureRight = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    const parsedvalue = JSON.parse(value);
    setSelectedFeatures(selectedFeatures.map((selectedfeature) => {
      const parsedfeature = JSON.parse(selectedfeature)
      if (parsedvalue.FeatureID === parsedfeature.FeatureID) {
        parsedfeature["FeatureRightID"] = parsedvalue.FeatureRightID;
        return JSON.stringify(parsedfeature);
      }
      return selectedfeature
    }))
  }

  const StepOne = (
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p className="formlabels"> Features </p>
        <div className="formfieldcontainer">
          <Select
            size="small"
            defaultValue={[]}
            className="selectfield"
            name="features"
            sx={{
              borderRadius: "15px",
              paddingTop: "0px"
            }}
            value={selectedFeatures}
            onChange={selectFeature}
            multiple
          >
            <MenuItem value="" disabled hidden>
              Choose a company
            </MenuItem>
            {featureOptions.map(({ id, text, value }) => (
              <MenuItem
                key={id}
                value={JSON.stringify({ FeatureName: text, FeatureID: value, FeatureRightID: 1 })}
              >
                {text}
              </MenuItem>
            ))}
          </Select>
        </div>
        {selectedFeatures.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className="formlabels" style={{ marginTop: 20 }}>
              {" "}
              Feature List{" "}
            </p>
            <div style={{ alignSelf: "center", width: "85%" }}>
              {selectedFeatures.map((selectedfeature) => {
                const parsedfeature = JSON.parse(selectedfeature);
                return (
                  <div
                    className="selectlist"
                  >
                    <div
                      style={{
                        flex: 14,
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {parsedfeature.FeatureName}
                    </div>
                    <div style={{ flex: 3, fontWeight: 500 }}>
                      <Select
                        defaultValue={JSON.stringify({ FeatureID: parsedfeature.FeatureID, FeatureRightID: 1})}
                        autoWidth
                        label="Age"
                        size="small"
                        className="smallselectfield"
                        onChange={(e)=> assignFeatureRight(e)}
                      >
                        {featureRightOptions.map((option) => {
                          return (
                            <MenuItem key={option.id} value={JSON.stringify({ FeatureID: parsedfeature.FeatureID, FeatureRightID: option.value})}>
                              {option.text}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                    <div style={{ flex: 1, fontWeight: 500 }}>
                      <button
                        onClick={() => unselectFeature(selectedfeature)}
                        style={{ marginLeft: 5, marginRight: "-5%" }}
                        type="button"
                        className="buttonremovestyling"
                      >
                        <CloseIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <p className="errormsg">{errors.features?.message}</p>
      </div>

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
  );

  return (
    <FormContainer
      header="Create User Group"
      multistep
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      {StepOne}
      {StepTwo}
    </FormContainer>
  );
};
export default AddUserGroup;
