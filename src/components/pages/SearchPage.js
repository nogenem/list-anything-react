import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import { Segment } from "semantic-ui-react";

import requestSearch from "../../actions/search";
import { getResults } from "../../reducers/searchResults";
import SearchResultTable from "../tables/SearchResultTable";

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

  onTableRowClick = e => {
    const to = e.currentTarget.getAttribute("to");
    this.props.history.push(to);
  };

  render() {
    const { results } = this.props;
    const { loading } = this.state;
    return (
      <Segment
        style={{ maxWidth: "90%", margin: "10px auto" }}
        loading={loading}
        basic
      >
        <SearchResultTable
          results={results}
          onTableRowClick={this.onTableRowClick}
        />
      </Segment>
    );
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
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
