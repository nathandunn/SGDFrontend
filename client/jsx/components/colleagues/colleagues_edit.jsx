import React from 'react';
import { connect } from 'react-redux';

// import ColleaguesFormShow from './colleagues_form_show';


// <ColleaguesFormShow isUpdate={this._isUpdate()} colleagueDisplayName={this.props.routeParams.colleagueDisplayName} isCurator={true} />
const ColleaguesEdit = React.createClass({
  render () {
    return (
      <span>edit</span>
    );
  },

  // true if edit page,not /new
  _isUpdate () {
    return (typeof this.props.routeParams.colleagueDisplayName === 'string');
  }

});

function mapStateToProps(_state) {
  return {
  };
}

export default connect(mapStateToProps)(ColleaguesEdit);
