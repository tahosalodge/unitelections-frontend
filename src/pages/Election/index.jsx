import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect } from '@reach/router';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Loading from 'components/Loading';
import { getElection } from 'state/modules/election';
import { listCandidates } from 'state/modules/candidate';
import { selectElection } from 'selectors/election';
import { electionShape } from 'shapes/election';
import { selectCandidatesForElection } from 'selectors/candidate';
import { selectUnitForElection } from 'selectors/unit';
import Tabs from 'components/Tabs';
import { arrayOfCandidates } from 'shapes/candidate';
import { unitShape } from 'shapes/unit';
import ElectionOverview from './Overview';
import ElectionCandidates from './Candidates';
import ElectionUnitInformation from './Unit';

const ScheduleElection = lazy(() => import('forms/Election/Schedule'));
const AddCandidate = lazy(() => import('./AddCandidate'));

class Election extends React.Component {
  static propTypes = {
    '*': PropTypes.string.isRequired,
    electionId: PropTypes.string.isRequired,
    getElection: PropTypes.func.isRequired,
    listCandidates: PropTypes.func.isRequired,
    election: electionShape.isRequired,
    children: PropTypes.node.isRequired,
    candidates: arrayOfCandidates.isRequired,
    unit: unitShape.isRequired,
  };

  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElection(electionId);
    this.props.listCandidates(electionId);
  }

  render() {
    const {
      election,
      loading,
      children,
      electionId,
      candidates,
      unit,
    } = this.props;
    return (
      <Loading loading={loading}>
        {election && unit && (
          <Paper>
            <ElectionOverview election={election} />
            <Tabs
              value={this.props['*'] || 'overview'}
              tabs={[
                {
                  label: 'Candidates',
                  path: 'candidates',
                },
                {
                  label: 'Unit',
                  path: 'unit',
                },
                // {
                //   label: 'Report',
                //   path: 'report',
                // },
              ]}
            />
            <Router>
              <ElectionCandidates
                election={election}
                candidates={candidates}
                path="candidates"
              />
              <ElectionUnitInformation
                election={election}
                unit={unit}
                path="unit"
              />
              <AddCandidate
                election={election}
                unitType={unit.unitType}
                path="candidates/new"
              />
              <ScheduleElection path="schedule" />

              <Redirect
                from={`/elections/${electionId}`}
                to={`/elections/${electionId}/overview`}
                default
                noThrow
              />
            </Router>
          </Paper>
        )}
        {children}
      </Loading>
    );
  }
}

const mapStateToProps = (state, props) => ({
  election: selectElection(state, props),
  candidates: selectCandidatesForElection(state, props),
  unit: selectUnitForElection(state, selectElection(state, props)),
  loading: state.loading.election,
});

export default connect(
  mapStateToProps,
  { getElection, listCandidates }
)(Election);
