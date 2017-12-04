import React from "react";
import { Table, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as sdReducers from "../../reducers/subjectData";
import { getFieldsHash } from "../../reducers/currentSubject";

const SubjectDataTable = ({
  loading,
  fields,
  subjectData,
  getSubjectDataData
}) => (
  <Table celled compact>
    <Table.Header>
      <Table.Row>
        {fields.map(field => (
          <Table.HeaderCell key={field._id}>
            {field.description}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {loading && (
        <Table.Row>
          <Table.Cell width={16}>
            <Loader active inline="centered" />
          </Table.Cell>
        </Table.Row>
      )}
      {!loading &&
        subjectData.map(sd => (
          <Table.Row key={sd._id}>
            {getSubjectDataData(sd._id).map(d => (
              <Table.Cell key={d._id}>{d.value}</Table.Cell>
            ))}
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
);

SubjectDataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  getSubjectDataData: PropTypes.func.isRequired,
  subjectData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  ).isRequired
};

function mapStateToProps(state) {
  return {
    getSubjectDataData: sdReducers.getSubjectDataData(
      state,
      getFieldsHash(state)
    )
  };
}

export default connect(mapStateToProps)(SubjectDataTable);
