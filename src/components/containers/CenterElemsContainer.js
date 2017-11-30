import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

const CenterElemsContainer = ({ children }) => (
  <div className="form-container">
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.form-container {
          height: 100%;
      }
    `}</style>
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
