import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";

class SearchInput extends Component {
  state = {
    query: "",
    error: false
  };

  onChange = e =>
    this.setState({
      query: e.target.value
    });

  onSubmit = () => {
    const { query } = this.state;
    if (query) {
      this.props.onSearch(query);
      this.setState({ error: false, query: "" });
    } else this.setState({ error: true });
  };

  render() {
    const { query, error } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          icon={{
            name: "search",
            link: true,
            onClick: this.onSubmit
          }}
          placeholder="Search..."
          size="mini"
          error={error}
          value={query}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchInput;
