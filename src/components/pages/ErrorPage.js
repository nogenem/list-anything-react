import React from "react";
import { Message } from "semantic-ui-react";

import CenterElemsContainer from "../containers/CenterElemsContainer";

const ErrorPage = () => (
  <CenterElemsContainer>
    <Message negative>
      <Message.Header>Something went wrong</Message.Header>
      <p>Please, try again later...</p>
    </Message>
  </CenterElemsContainer>
);

export default ErrorPage;
