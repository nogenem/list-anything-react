import React from "react";
import PropTypes from "prop-types";

import CenterElemsContainer from "../containers/CenterElemsContainer";
import ErrorMessage from "../messages/ErrorMessage";

const ErrorPage = ({ error }) => (
  <CenterElemsContainer>
    <ErrorMessage text={error || "Please, try again later..."} />
  </CenterElemsContainer>
);

ErrorPage.propTypes = {
  error: PropTypes.string
};

ErrorPage.defaultProps = {
  error: ""
};

export default ErrorPage;
