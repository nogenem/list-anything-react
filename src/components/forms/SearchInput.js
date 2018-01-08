import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
    this.icon = {
      name: "search",
      link: true,
      onClick: this.onSubmit
    };
  }

  onSubmit = () => {
    const $input = this.getInput();
    const query = $input.value;
    if (query) {
      this.props.onSearch(query);
      this.setState({ error: false });
    } else this.setState({ error: true });
    $input.value = "";
    $input.blur();
  };

  getInput = () =>
    document.querySelector(`#${this.props.id} input[name="query"]`);

  render() {
    const { error } = this.state;
    return (
      <Form id={this.props.id} onSubmit={this.onSubmit}>
        <Input
          icon={this.icon}
          placeholder="Search..."
          size="mini"
          error={error}
          name="query"
        />
      </Form>
    );
  }
}

SearchInput.propTypes = {
  // ownProps
  id: PropTypes.string,
  onSearch: PropTypes.func.isRequired
};

SearchInput.defaultProps = {
  id: `seach-form-${Math.floor(Math.random() * 100000)}`
};

export default SearchInput;
