import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

const render = value =>
  value.startsWith("http") ? (
    <a href={value} target="_blank">
      {value}
    </a>
  ) : (
    value
  );

const ListField = ({ values, onRemove, renderValue, style }) => (
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
  // ownProps
  values: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  onRemove: PropTypes.func,
  renderValue: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.string)
};

ListField.defaultProps = {
  onRemove: null,
  renderValue: render,
  style: {}
};

export default ListField;
