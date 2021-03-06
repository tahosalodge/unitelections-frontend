import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from '@reach/router';
import { format } from 'date-fns-tz';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import timeZone from 'constants/timeZone';
import Page from 'components/Page';
import Table from 'components/Table';
import { selectElections } from 'selectors/election';
import { listElections, deleteElection } from 'state/modules/election';
import { arrayOfElections } from 'shapes/election';
import Chapter from 'components/Chapter';
import Actions from './Actions';

class Elections extends React.Component {
  static propTypes = {
    listElections: PropTypes.func.isRequired,
    elections: arrayOfElections.isRequired,
    deleteElection: PropTypes.func.isRequired,
  };

  state = {
    actions: '',
  };

  columns = [
    {
      title: 'Unit',
      render: ({ unit: { unitType, number }, _id: electionId }) =>
        unitType && number ? (
          <Link to={`/elections/${electionId}`}>{`${unitType} ${number}`}</Link>
        ) : (
          ''
        ),
    },
    {
      title: 'Chapter',
      render: ({ chapter }) => <Chapter chapterId={chapter} suffix="" />,
    },
    {
      title: 'Status',
      accessor: 'status',
    },
    {
      title: 'Season',
      accessor: 'season',
    },
    {
      title: 'Requested Dates',
      render: ({ requestedDates }) =>
        requestedDates
          .map(d => format(d, 'MM/dd/yyyy', { timeZone }))
          .join(', '),
    },
    {
      title: '',
      render: ({ _id }) => (
        <IconButton onClick={() => this.openActions(_id)}>
          <MoreIcon />
        </IconButton>
      ),
    },
  ];

  componentDidMount() {
    this.props.listElections();
  }

  openActions = actions =>
    this.setState({
      actions,
    });

  closeActions = () =>
    this.setState({
      actions: '',
    });

  render() {
    const { elections } = this.props;
    const { actions } = this.state;
    return (
      <Page title="Elections" fullwidth>
        <Actions
          electionId={actions}
          onClose={this.closeActions}
          deleteElection={this.props.deleteElection}
        />
        <Table data={elections} columns={this.columns} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  elections: selectElections(state),
});

export default connect(
  mapStateToProps,
  { listElections, deleteElection }
)(Elections);
