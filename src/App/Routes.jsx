import React from 'react';
import { Router } from '@reach/router';
import Election from 'pages/Election';
import Elections from 'pages/Elections';
import NewElection from 'pages/NewElection';
import Unit from 'pages/Unit';
import NewUnit from 'pages/NewUnit';
import Units from 'pages/Units';

const Routes = () => (
  <Router>
    <Election path="/elections/:id" />
    <Elections path="/elections" />
    <NewElection path="/elections/new" />
    <Unit path="/units/:id" />
    <Units path="/units" />
    <NewUnit path="/units/new" />
  </Router>
);

export default Routes;
