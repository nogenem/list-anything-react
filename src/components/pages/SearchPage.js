import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";

import requestSearch from "../../actions/search";
import { getResults } from "../../reducers/searchResults";

class SearchPage extends Component {
  state = {
    loading: true
  };

  componentDidMount = () => {
    const qObj = queryString.parse(this.props.location.search);
    this.props
      .requestSearch(qObj.query)
      .then(() => this.setState({ loading: false }));
  };

  render() {
    const { results } = this.props;
    return <ul>{results.map(res => <li key={res._id}>{res.value}</li>)}</ul>;
  }
}

SearchPage.propTypes = {
  // ownProps
  results: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      value: PropTypes.string,
      subject: PropTypes.string,
      tab: PropTypes.string
    })
  ).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  // mapDispatchToProps
  requestSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  results: getResults(state)
});

export default connect(mapStateToProps, { requestSearch })(SearchPage);
