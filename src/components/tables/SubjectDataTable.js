import React from "react";
import { Table, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";

import * as fieldTypes from "../../constants/fieldTypes";

import TextInputField from "../fields/TextInputField";
import UrlInputImgField from "../fields/UrlInputImgField";
import NumberInputField from "../fields/NumberInputField";
import TextareaField from "../fields/TextareaField";
import UrlInputField from "../fields/UrlInputField";

const renderValue = (data, field) => {
  const fieldData = {
    key: data._id,
    value: data.value,
    showFieldDescription: false
  };
  switch (field.field_type) {
    case fieldTypes.TEXT_INPUT:
      return <TextInputField {...fieldData} />;
    case fieldTypes.URL_INPUT_IMG:
      return <UrlInputImgField {...fieldData} />;
    case fieldTypes.NUMBER_INPUT:
      return <NumberInputField {...fieldData} />;
    case fieldTypes.TEXTAREA:
      return <TextareaField {...fieldData} />;
    case fieldTypes.URL_INPUT:
      return <UrlInputField {...fieldData} />;
    default:
      return <div key={data._id} />;
  }
};

const renderCell = (subjectData, field) => {
  const data = subjectData.data[field._id];
  return (
    <Table.Cell collapsing key={data._id}>
      {renderValue(data, field)}
    </Table.Cell>
  );
};

const SubjectDataTable = ({
  loading,
  onTableRowClick,
  fields,
  subjectDataArray
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
        subjectDataArray.map(sd => (
          <Table.Row
            key={sd._id}
            to={`/subject-data/${sd._id}`}
            onClick={onTableRowClick}
          >
            {fields.map(field => renderCell(sd, field))}
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
  subjectDataArray: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  ).isRequired,
  onTableRowClick: PropTypes.func.isRequired
};

SubjectDataTable.defaultProps = {
  fieldHash: {}
};

export default SubjectDataTable;
