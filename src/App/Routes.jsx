import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';
import CircularProgress from '@material-ui/core/CircularProgress';

const Election = lazy(() => import('pages/Election'));
const Elections = lazy(() => import('pages/Elections'));
const NewElection = lazy(() => import('pages/NewElection'));
const Unit = lazy(() => import('pages/Unit'));
const NewUnit = lazy(() => import('pages/NewUnit'));
const Units = lazy(() => import('pages/Units'));
const Candidate = lazy(() => import('forms/Candidate'));
const Nomination = lazy(() => import('forms/Nomination'));
const Report = lazy(() => import('forms/Report'));
const UnitSteps = lazy(() => import('components/UnitSteps'));
const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('components/Login'));
const Register = lazy(() => import('components/Register'));
const Lodges = lazy(() => import('components/Lodges'));
const Users = lazy(() => import('components/Users'));

const Routes = () => (
  <Router>
    <Suspense default fallback={<CircularProgress />}>
      <Election path="/elections/:electionId" />
      <Elections path="/elections" />
      <Unit path="/units/:unitId" />
      <NewElection path="/units/:unitId/request-election" />
      <Units path="/units" />
      <NewUnit path="/units/new" />
      <Candidate path="/candidate" />
      <Nomination path="/nomination" />
      <Report path="/report" />
      <UnitSteps path="/unit-steps" />
      <Login path="/login" />
      <Register path="/register" />
      <Lodges path="/lodges" />
      <Users path="/users" />
      <Home default />
    </Suspense>
  </Router>
);

export default Routes;
