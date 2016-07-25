import React from 'react';
import { connect } from 'react-redux';

const YeastLabsContainer = React.createClass({
  render() {
    return <h1>Yeast Labs Container</h1>
  }
});

function mapStateToProps(_state) {
  return {
  };
}

module.exports = connect(mapStateToProps)(YeastLabsContainer);