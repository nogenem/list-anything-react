import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

const CenterElemsContainer = ({ children }) => (
  <div id="center-elems-container">
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>{children}</Grid.Column>
    </Grid>
  </div>
);

CenterElemsContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default CenterElemsContainer;
