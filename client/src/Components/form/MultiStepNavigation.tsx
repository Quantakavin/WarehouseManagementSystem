import React, { useState } from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import { UseMutationResult } from "react-query";
import { AxiosResponse } from "axios";

interface MultiStepNavigationProps {
    step: number;
    // setStep: React.Dispatch<React.SetStateAction<number>>;
    nextStep: () => void;
    prevStep: () => void;
    mutation: UseMutationResult<AxiosResponse<any, any>>;
  }

const MultiStepNavigation: React.FC<MultiStepNavigationProps> = ({step, nextStep, prevStep, mutation}) => {

    const navigate = useNavigate();

    if (step === 1) {
        return(
            <div className="formnavigationcontainer">
            <button className="formnavigation" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              className="nextbutton"
              onClick={() => nextStep()}
            >
              Next <NavigateNextIcon style={{marginRight: -10, marginLeft: -7}}/>
            </button>
            </div>
        )

    } else {
        return(
            <div className="formnavigationcontainer">
            <button className="formnavigation" onClick={() => prevStep()}>
              Back
            </button>
            <SubmitButton text="Submit" loading={mutation.isLoading} multipart={true} />
            </div>
        )
    }
}

export default MultiStepNavigation;