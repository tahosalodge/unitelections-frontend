import React from 'react';
import Page from 'components/Page';
import Table from 'components/Table';
import { arrayOfNominations } from 'shapes/nomination';
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
    // eslint-disable-next-line
    render: ({ _id }) => (
      <IconButton component={Link} to={`/nominations/${_id}`}>
        <MoreIcon />
      </IconButton>
    ),
  },
];

const ElectionNominations = ({ election, nominations }) => (
  <Page title="Nominations" fullwidth squareTop noShadow>
    <Table columns={columns} data={nominations} />
    <br />
    {election.status !== 'Reported' && (
      <Fab component={Link} to="new">
        <AddIcon />
      </Fab>
    )}
  </Page>
);

ElectionNominations.propTypes = {
  nominations: arrayOfNominations.isRequired,
  election: electionShape.isRequired,
};

export default ElectionNominations;
