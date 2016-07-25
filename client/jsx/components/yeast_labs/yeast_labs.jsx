import React from 'react';

import SearchBar from '../widgets/search_bar.jsx';

const COLLEAGUE_BASE_URL = '/backend/colleagues';

const YeastLabsContainer = React.createClass({

  getInitialState () {
    return {
      searchResults: []
    };
  },

  _renderSearchResults () {
    return this.state.searchResults.map( (d,i) => {
      return <p key={`labRes${i}`}>{d.last_name}</p>;
    });
  },

  _renderSearchBar () {
    var _onSubmit = query => {
      this._fetchData(query);
    }
    return <SearchBar onSubmit={_onSubmit} />;
  },

  _fetchData (query) {
    var url = `${COLLEAGUE_BASE_URL}?last_name=${query}`;
    fetch(url).then( response => {
      return response.json();
    }).then( results => {
      this.setState({ searchResults: results });
    });
  },

  render () {
    return (
      <div>
        <h1>Find a Yeast Lab</h1>
        <hr />
        {this._renderSearchBar()}
        {this._renderSearchResults()}
      </div>
    );
  }
});


module.exports = YeastLabsContainer;

