import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import ColleaguesFormShow from './colleagues_form_show';

const ColleaguesShow = React.createClass({
  // <ColleaguesFormShow
  //         isReadOnly={true} isCurator={true} 
  //         colleagueDisplayName={this.props.routeParams.colleagueDisplayName}
  //       />
  render () {
    return (
      <div>
        <ul className='menu simple'>
          <li><Link to={`/colleague/${this.props.routeParams.formatName}/edit`}><i className='fa fa-edit' /> Edit</Link></li>
        </ul>
      </div>
    );
  }
});

function mapStateToProps(_state) {
  return {
  };
}

export default connect(mapStateToProps)(ColleaguesShow);
