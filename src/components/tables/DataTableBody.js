import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

const styles = {
  body: { cursor: "pointer" }
};

const DataTableBody = ({ renderBody }) => (
  <Table.Body style={styles.body}>{renderBody()}</Table.Body>
);

DataTableBody.propTypes = {
  // ownProps
  renderBody: PropTypes.func.isRequired
};

export default DataTableBody;
