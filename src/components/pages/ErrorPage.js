import React from "react";

import CenterElemsContainer from "../containers/CenterElemsContainer";
import ErrorMessage from "../messages/ErrorMessage";

const ErrorPage = () => (
  <CenterElemsContainer>
    <ErrorMessage text={"Server is offline. Please, try again later..."} />
  </CenterElemsContainer>
);

export default ErrorPage;
