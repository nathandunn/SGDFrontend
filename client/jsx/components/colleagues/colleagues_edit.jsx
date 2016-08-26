import React from 'react';
import { connect } from 'react-redux';

import ColleaguesFormShow from './colleagues_form_show.jsx';

const ColleaguesEdit = React.createClass({
  render () {
    return (
      <ColleaguesFormShow isUpdate={true} colleagueDisplayName={this.props.routeParams.colleagueDisplayName} isCurator={false} />
    );
  }
});

function mapStateToProps(_state) {
  return {
  };
}

export default connect(mapStateToProps)(ColleaguesEdit);
