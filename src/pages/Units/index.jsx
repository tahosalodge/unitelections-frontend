import React from 'react';
import Page from 'components/Page';
import Table from 'components/Table';
import data from 'data/units';

const columns = [
  {
    title: 'Chapter',
    accessor: 'chapter',
  },
  {
    title: 'ID',
    accessor: '_id',
  },
  {
    title: 'Number',
    accessor: 'number',
  },
  {
    title: 'Address',
    render: ({ meetingLocation }) => JSON.stringify(meetingLocation, null, 2),
  },
];

const Units = () => (
  <Page title="Units">
    <Table data={data} columns={columns} />
  </Page>
);

export default Units;
