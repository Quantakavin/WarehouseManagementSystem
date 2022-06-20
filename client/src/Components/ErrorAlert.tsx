import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'react-bootstrap';
import { AxiosError, AxiosResponse } from 'axios';

const AlertDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20;
margin-bottom: -20;
`;

interface ErrorProps {
    error: AxiosError
}

const ErrorAlert = ({error}: ErrorProps) => {
    const [close, setClose] = useState<boolean>(false);
    const response = error.response as AxiosResponse;

    return (
        <>
        {!close?
        <AlertDiv>
        <Alert style={{width: "80%"}} variant="danger" onClose={() => setClose(true)} dismissible>
        <Alert.Heading>Error!</Alert.Heading>
        <p>
          { typeof response.data === "undefined"? error.message: response.data.message }
        </p>
        </Alert>
        </AlertDiv>
        : <></>}
        </>
    )
}

export default ErrorAlert;