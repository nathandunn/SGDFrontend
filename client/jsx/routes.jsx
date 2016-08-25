import React from 'react';
import { Route } from 'react-router';

// import handler containers
import Layout from './containers/layout.jsx';
import Search from './containers/search.jsx';
import StyleGuide from './components/style_guide/style_guide.jsx';
import ColleaguesEdit from './components/colleagues/colleagues_edit.jsx';
import ColleaguesShow from './components/colleagues/colleagues_show.jsx';
import ExampleContainer from './containers/example_container.jsx';

module.exports = (
  <Route path='/' component={Layout}>
    <Route path='search' component={Search} />
    <Route path='style-guide' component={StyleGuide} />
    <Route path='colleague/:formatName/overview' component={ColleaguesShow} />
    <Route path='colleague/:formatName/edit' component={ColleaguesEdit} />
  </Route>
);
