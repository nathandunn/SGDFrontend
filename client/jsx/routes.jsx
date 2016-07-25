import React from 'react';
import { Route } from 'react-router';

// import handler containers
import Layout from './containers/layout.jsx';
import Search from './containers/search.jsx';
import StyleGuide from './components/style_guide/style_guide.jsx';
import ExampleContainer from './containers/example_container.jsx';
import YeastLabsContainer from './components/yeast_labs/yeast_labs.jsx';

module.exports = (
  <Route path="/" component={Layout}>
    <Route path="search" component={Search} />
    <Route path="style-guide" component={StyleGuide} />
    <Route path="yeast-labs" component={YeastLabsContainer} />
  </Route>
);
