import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Page from 'components/Page';
import { listElections } from 'state/modules/election';
import { listCandidates } from 'state/modules/candidate';
import { listUnits } from 'state/modules/unit';
import { listNominations } from 'state/modules/nomination';
import { selectCandidates } from 'selectors/candidate';
import { selectNominations } from 'selectors/nomination';
import { selectElections } from 'selectors/election';
import { getChapters } from 'selectors/auth';
import { arrayOfElections } from 'shapes/election';
import { arrayOfCandidates } from 'shapes/candidate';
import { arrayOfUnits } from 'shapes/unit';
import { arrayOfNominations } from 'shapes/nomination';
import { arrayOfChapters } from 'shapes/auth';

import ElectionsByMonth from './ElectionsByMonth';
import ElectionsByChapter from './ElectionsByChapter';
import ElectionsByDOW from './ElectionsByDOW';
import { calculateReports } from './selectors';

const Reports = ({
  elections,
  candidates,
  units,
  nominations,
  chapters,
  ...props
}) => {
  useEffect(() => {
    props.listElections();
    props.listCandidates();
    props.listUnits();
    props.listNominations();
  }, []);
  const reports = useMemo(
    () =>
      calculateReports({ elections, candidates, units, nominations, chapters }),
    [elections, candidates, units, nominations, chapters]
  );
  return (
    <Page title="reports">
      <Typography variant="h6">Elections by Month</Typography>
      <ElectionsByMonth data={reports.electionsByMonth} />
      <Typography variant="h6">Elections by Chapter</Typography>
      <ElectionsByChapter data={reports.electionsByChapter} />
      <Typography variant="h6">Elections by Day of Week</Typography>
      <ElectionsByDOW data={reports.electionsByDOW} />
    </Page>
  );
};

const mapStateToProps = state => ({
  elections: selectElections(state),
  candidates: selectCandidates(state),
  units: [],
  nominations: selectNominations(state),
  chapters: getChapters(state),
});

Reports.propTypes = {
  listElections: PropTypes.func.isRequired,
  listCandidates: PropTypes.func.isRequired,
  listUnits: PropTypes.func.isRequired,
  listNominations: PropTypes.func.isRequired,
  elections: arrayOfElections.isRequired,
  candidates: arrayOfCandidates.isRequired,
  units: arrayOfUnits.isRequired,
  nominations: arrayOfNominations.isRequired,
  chapters: arrayOfChapters.isRequired,
};

export default connect(
  mapStateToProps,
  { listElections, listCandidates, listUnits, listNominations }
)(Reports);
