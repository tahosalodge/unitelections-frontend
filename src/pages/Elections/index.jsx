import React from 'react';
import Page from 'components/Page';
import Table from 'components/Table';
import data from 'data/elections';

const columns = [
  {
    title: 'Status',
    accessor: 'status',
  },
  {
    title: 'ID',
    accessor: '_id',
  },
  {
    title: 'Season',
    accessor: 'season',
  },
  {
    title: 'Requested Dates',
    render: ({ requestedDates }) => requestedDates.join(', '),
  },
];

const Elections = () => (
  <Page title="Elections">
    <Table data={data} columns={columns} />
  </Page>
);

export default Elections;
