import { Alert, AlertTitle } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";

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
            severity="error"
            sx={{ width: "80%" }}
            onClose={() => setClose(true)}
          >
            <AlertTitle>Error</AlertTitle>
            <p>
              {typeof response.data === "undefined"
                ? error.message
                : response.data.message}
            </p>
          </Alert>
          {/* <Alert
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
          </Alert> */}
        </div>
      ) : null}
    </div>
  );
};

export default ErrorAlert;
