import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logout from 'components/Logout';
import Login from 'components/Login';
import authShape from 'shapes/auth';

const Election = lazy(() => import('pages/Election'));
const Elections = lazy(() => import('pages/Elections'));
const NewElection = lazy(() => import('forms/Election'));
const Unit = lazy(() => import('pages/Unit'));
const EditUnit = lazy(() => import('pages/Unit/Edit'));
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
const RequestNewPassword = lazy(() => import('components/Login/ResetPassword'));
const ScheduleElection = lazy(() => import('forms/Election/Schedule'));

const AdminRoutes = ({ auth, children }) => {
  if (auth.user.isAdmin) {
    return children;
  }
  return null;
};

const Routes = ({ auth }) => (
  <Router>
    <Suspense default fallback={<CircularProgress />}>
      <Election path="/elections/:electionId">
        <ScheduleElection path="schedule" />
      </Election>
      <Elections path="/elections" />
      <NewElection path="/units/:unitId/request-election" />
      <Unit path="/units/:unitId">
        <ScheduleElection path="schedule-election" />
        <EditUnit path="edit" />
      </Unit>
      <Units path="/units" />
      <NewUnit path="/units/new" />
      <Candidate path="/candidate" />
      <Nomination path="/nomination" />
      <Report path="/report" />
      <UnitSteps path="/unit-steps" />
      <Login path="/login" />
      <Register path="/register" />
      <Logout path="/logout" />
      <RequestNewPassword path="/request-password" />
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
