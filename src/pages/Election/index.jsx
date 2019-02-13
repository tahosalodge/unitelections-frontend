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
import { getCanReportElection } from 'selectors/auth';
import ElectionOverview from './Overview';
import ElectionCandidates from './Candidates';
import ElectionUnitInformation from './Unit';
import ElectionReport from './Report';

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
    canReportElection: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElection(electionId);
    this.props.listCandidates(electionId);
  }

  getTabs = () => {
    const { canReportElection } = this.props;
    const tabs = [
      {
        label: 'Candidates',
        path: 'candidates',
      },
      {
        label: 'Unit',
        path: 'unit',
      },
    ];

    if (canReportElection) {
      tabs.push({
        label: 'Report',
        path: 'report',
      });
    }

    return tabs;
  };

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
              value={this.props['*'] || 'candidates'}
              tabs={this.getTabs()}
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
              <ElectionReport
                election={election}
                candidates={candidates}
                path="report"
              />

              <Redirect
                from={`/elections/${electionId}`}
                to={`/elections/${electionId}/candidates`}
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
  canReportElection: getCanReportElection(state, props),
});

export default connect(
  mapStateToProps,
  { getElection, listCandidates }
)(Election);
