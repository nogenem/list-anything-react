import React from "react";
import { Table, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as sdReducers from "../../reducers/subjectData";
import { getFieldsHash } from "../../reducers/currentSubject";
import * as fieldTypes from "../../constants/fieldTypes";

import TextInputField from "../fields/TextInputField";
import UrlInputImgField from "../fields/UrlInputImgField";

const renderValue = (data, fieldHash) => {
  const fieldData = {
    key: data._id,
    editable: false,
    error: "",
    value: data.value
  };
  switch (fieldHash[data.fieldId].field_type) {
    case fieldTypes.TEXT_INPUT:
      return <TextInputField {...fieldData} />;
    case fieldTypes.URL_INPUT_IMG:
      return <UrlInputImgField {...fieldData} />;
    default:
      return <div key={data._id} />;
  }
};

const SubjectDataTable = ({
  loading,
  fields,
  subjectData,
  fieldHash,
  getSubjectDataData
}) => (
  <Table celled compact="very" selectable>
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
              <Table.Cell collapsing key={d._id}>
                {renderValue(d, fieldHash)}
              </Table.Cell>
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
  ).isRequired,
  fieldHash: PropTypes.objectOf(
    PropTypes.shape({
      _id: PropTypes.string
    })
  )
};

SubjectDataTable.defaultProps = {
  fieldHash: {}
};

function mapStateToProps(state) {
  const fieldHash = getFieldsHash(state);
  return {
    getSubjectDataData: sdReducers.getSubjectDataData(state, fieldHash),
    fieldHash
  };
}

export default connect(mapStateToProps)(SubjectDataTable);
