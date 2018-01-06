import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

const renderValue = value =>
  value.startsWith("http") ? (
    <a href={value} target="_blank">
      {value}
    </a>
  ) : (
    value
  );

const ListField = ({ values, onRemove, style }) => (
  <List celled style={style}>
    {values.map((value, idx) => (
      <List.Item key={idx}>
        {onRemove && (
          <List.Content floated="right">
            <List.Icon link name="remove" onClick={() => onRemove(idx)} />
          </List.Content>
        )}
        <List.Content>{renderValue(value)}</List.Content>
      </List.Item>
    ))}
  </List>
);

ListField.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemove: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.string)
};

ListField.defaultProps = {
  onRemove: null,
  style: {}
};

export default ListField;
