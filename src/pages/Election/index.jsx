import React, { Fragment, lazy } from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect } from '@reach/router';
import { connect } from 'react-redux';
import Loading from 'components/Loading';
import { getElection } from 'state/modules/election';
import { listCandidates } from 'state/modules/candidate';
import { selectElection } from 'selectors/election';
import { electionShape } from 'shapes/election';
import { selectCandidates } from 'selectors/candidate';
import Tabs from 'components/Tabs';
import { arrayOfCandidates } from 'shapes/candidate';
import ElectionOverview from './Overview';
import ElectionCandidates from './Candidates';

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
  };

  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElection(electionId);
    this.props.listCandidates(electionId);
  }

  render() {
    const { election, loading, children, electionId, candidates } = this.props;
    return (
      <Fragment>
        {election && <ElectionOverview election={election} />}
        <Tabs
          value={this.props['*'] || 'overview'}
          tabs={[
            {
              label: 'Overview',
              path: 'overview',
            },
            {
              label: 'Candidates',
              path: 'candidates',
            },
            // {
            //   label: 'Nominations',
            //   path: 'nominations',
            // },
            // {
            //   label: 'Report',
            //   path: 'report',
            // },
          ]}
        />
        <Loading loading={loading}>
          <Router>
            <ElectionOverview election={election} path="overview" />
            <ElectionCandidates
              election={election}
              candidates={candidates}
              path="candidates"
            />
            <AddCandidate election={election} path="candidates/new" />

            <Redirect
              from={`/elections/${electionId}`}
              to={`/elections/${electionId}/overview`}
              default
              noThrow
            />
          </Router>
          {children}
        </Loading>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  election: selectElection(state, props),
  candidates: selectCandidates(state),
  loading: state.loading.election,
});

export default connect(
  mapStateToProps,
  { getElection, listCandidates }
)(Election);
