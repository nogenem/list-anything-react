import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddSubjectCtA = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Add new subject</Card.Header>
      <Link to="/subjects/new">
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
);

export default AddSubjectCtA;
