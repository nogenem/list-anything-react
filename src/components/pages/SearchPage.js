import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import { Segment } from "semantic-ui-react";

import searchRequest from "../../actions/search";
import { getResults } from "../../reducers/searchResults";
import SearchResultTable from "../tables/SearchResultTable";
import ErrorMessage from "../messages/ErrorMessage";

class SearchPage extends Component {
  state = {
    loading: true,
    error: false
  };

  componentDidMount = () => {
    this.makeSearchRequest(this.props);
  };

  componentWillReceiveProps = nextProps => {
    const mySearch = this.props.location.search;
    const nextSearch = nextProps.location.search;

    if (mySearch !== nextSearch) {
      this.makeSearchRequest(nextProps);
    }
  };

  onTableRowClick = e => {
    const to = e.currentTarget.getAttribute("to");
    this.props.history.push(to);
  };

  makeSearchRequest = props => {
    const qObj = queryString.parse(props.location.search);
    props
      .searchRequest(qObj.query)
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false, error: true }));
  };

  render() {
    const { results } = this.props;
    const { loading, error } = this.state;
    return (
      <Segment
        style={{ maxWidth: "90%", margin: "10px auto" }}
        loading={loading}
        basic
      >
        {error && <ErrorMessage text="" />}
        {!error && (
          <SearchResultTable
            results={results}
            onTableRowClick={this.onTableRowClick}
          />
        )}
      </Segment>
    );
  }
}

SearchPage.propTypes = {
  // ownProps
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  // mapDispatchToProps
  searchRequest: PropTypes.func.isRequired,
  // mapStateToProps
  results: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      value: PropTypes.string,
      subject: PropTypes.string,
      tab: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = state => ({
  results: getResults(state)
});

export const UnconnectedSearchPage = SearchPage;
export default connect(mapStateToProps, { searchRequest })(SearchPage);
