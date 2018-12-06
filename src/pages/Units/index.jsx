import React from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Table from 'components/Table';
import { listUnits } from 'state/modules/unit';

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

class Units extends React.Component {
  componentDidMount() {
    this.props.listUnits();
  }

  render() {
    const { units } = this.props;
    return (
      <Page title="Units">
        <Table data={units} columns={columns} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  units: Object.values(state.unit.items),
});

export default connect(
  mapStateToProps,
  { listUnits }
)(Units);
