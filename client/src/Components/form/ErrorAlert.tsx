import React, { useState } from "react";
import styled from "styled-components";
import { Alert } from "react-bootstrap";
import { AxiosError, AxiosResponse } from "axios";

interface ErrorProps {
  error: AxiosError;
}

const ErrorAlert: React.FC<ErrorProps> = ({ error }) => {
  const [close, setClose] = useState<boolean>(false);
  const response = error.response as AxiosResponse;

  return (
    <div>
      {!close ? (
        <div className="alertdiv">
          <Alert
            style={{ width: "80%" }}
            variant="danger"
            onClose={() => setClose(true)}
            dismissible
          >
            <Alert.Heading>Error!</Alert.Heading>
            <p>
              {typeof response.data === "undefined"
                ? error.message
                : response.data.message}
            </p>
          </Alert>
        </div>
      ) : null}
    </div>
  );
};

export default ErrorAlert;
