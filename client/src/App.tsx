/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import React from "react";
import ErrorBoundary from "react-error-boundary";
// import SuspenseFallback from  "./Components/suspense";
// import Middlewares from "./Middlwares";
// import ErrorPage from "./Components/error-page";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/routes"

const App = ()=> {
  return (
    // <ErrorBoundary FallbackComponent={ErrorPage}> 
        // <Middlewares> 
          <BrowserRouter>
            {/* <Suspense fallback={<SuspenseFallback />}> */}
              <AppRoutes />
          </BrowserRouter>
        // </Middlewares>
    // </ErrorBoundary>

  );
};

export default App;
