import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ElectionReportForm from 'forms/Report';
import Page from 'components/Page';
import { reportElection } from 'state/modules/election';
import { arrayOfCandidates } from 'shapes/candidate';
import { electionShape } from 'shapes/election';

const formCandidates = candidates =>
  candidates.reduce((map, candidate) => {
    const newMap = {
      ...map,
      [candidate._id]: false,
    };
    return newMap;
  }, {});

const ElectionReport = ({ election, candidates, ...props }) => (
  <Page fullwidth squareTop noShadow>
    {election.status === 'Reported' ? (
      <Typography variant="body1">
        This election has already been reported. For any updates, please contact
        us at{' '}
        <a href="mailto:elections@tahosalodge.org">elections@tahosalodge.org</a>
      </Typography>
    ) : (
      <ElectionReportForm
        election={election}
        candidates={candidates}
        ballot={formCandidates(candidates)}
        reportElection={props.reportElection}
      />
    )}
  </Page>
);

ElectionReport.propTypes = {
  election: electionShape.isRequired,
  candidates: arrayOfCandidates.isRequired,
  reportElection: PropTypes.func.isRequired,
};

export default connect(
  null,
  { reportElection }
)(ElectionReport);
