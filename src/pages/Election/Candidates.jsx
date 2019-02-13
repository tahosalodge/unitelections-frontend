import React from 'react';
import Page from 'components/Page';
import Table from 'components/Table';
import { arrayOfCandidates } from 'shapes/candidate';
import { Link } from '@reach/router';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import { electionShape } from 'shapes/election';

const columns = [
  {
    title: 'BSA ID',
    accessor: 'bsaid',
  },
  {
    title: 'Name',
    render: ({ fname, lname }) => `${fname} ${lname}`,
  },
  {
    title: 'Status',
    accessor: 'status',
  },
  {
    title: '',
    render: ({ _id }) => (
      <IconButton component={Link} to={`/candidates/${_id}`}>
        <MoreIcon />
      </IconButton>
    ),
  },
];

const ElectionCandidates = ({ election, candidates }) => (
  <Page title="Candidates" fullwidth squareTop noShadow>
    <Table columns={columns} data={candidates} />
    <br />
    {election.status !== 'Reported' && (
      <Fab component={Link} to="new">
        <AddIcon />
      </Fab>
    )}
  </Page>
);

ElectionCandidates.propTypes = {
  candidates: arrayOfCandidates.isRequired,
  election: electionShape.isRequired,
};

export default ElectionCandidates;
