import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logout from 'components/Logout';
import Login from 'components/Login';
import authShape from 'shapes/auth';

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
const Register = lazy(() => import('components/Register'));
const Lodges = lazy(() => import('components/Lodges'));
const Users = lazy(() => import('pages/Users'));
const CreateUser = lazy(() => import('pages/Users/Create'));
const EditUser = lazy(() => import('pages/Users/Edit'));
const ResetPassword = lazy(() => import('pages/ResetPassword'));

const AdminRoutes = ({ auth, children }) => {
  if (auth.user.isAdmin) {
    return children;
  }
  return null;
};

const Routes = ({ auth }) => (
  <Router>
    <Suspense default fallback={<CircularProgress />}>
      <Election path="/elections/:electionId" />
      <Elections path="/elections" />
      <NewElection path="/units/:unitId/request-election" />
      <Unit path="/units/:unitId" />
      <Units path="/units" />
      <NewUnit path="/units/new" />
      <Candidate path="/candidate" />
      <Nomination path="/nomination" />
      <Report path="/report" />
      <UnitSteps path="/unit-steps" />
      <Login path="/login" />
      <Register path="/register" />
      <Logout path="/logout" />
      <ResetPassword path="/reset-password/:email/:token" />
      <AdminRoutes path="/admin" auth={auth}>
        <Users path="users">
          <CreateUser path="new" />
          <EditUser path=":userId" />
        </Users>
        <Lodges path="lodges" />
      </AdminRoutes>
      <Home default />
    </Suspense>
  </Router>
);

Routes.propTypes = {
  auth: authShape.isRequired,
};

export default Routes;
