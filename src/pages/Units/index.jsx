import React from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/fp/compose';
import { connect } from 'react-redux';
import { Link } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import FloatingActionButton from '@material-ui/core/Fab';
import MoreIcon from '@material-ui/icons/MoreVert';
import LocationIcon from '@material-ui/icons/MyLocation';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import Page from 'components/Page';
import Table from 'components/Table';
import { listUnits, deleteUnit } from 'state/modules/unit';
import createMapLink from 'utils/googleMapLink';
import { arrayOfUnits } from 'shapes/unit';
import { getUnits } from 'selectors/unit';
import Chapter from 'components/Chapter';
import Actions from './Actions';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 2,
  },
});

class Units extends React.Component {
  static propTypes = {
    units: arrayOfUnits.isRequired,
    listUnits: PropTypes.func.isRequired,
    deleteUnit: PropTypes.func.isRequired,
  };

  state = {
    actions: '',
  };

  columns = [
    {
      title: 'Unit',
      render: ({ unitType, number, _id }) => (
        <Link to={`/units/${_id}`}>
          {`${unitType.charAt(0).toUpperCase() + unitType.slice(1)} ${number}`}
        </Link>
      ),
    },
    {
      title: 'Chapter',
      render: ({ chapter }) => <Chapter chapterId={chapter} suffix="" />,
    },
    {
      title: 'Location',
      render: ({ meetingLocation }) => (
        <a
          href={createMapLink(meetingLocation)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LocationIcon />
        </a>
      ),
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
    this.props.listUnits();
  }

  openActions = actions => this.setState({ actions });

  closeActions = () => this.setState({ actions: '' });

  render() {
    const { units, classes } = this.props;
    const { actions } = this.state;
    return (
      <Page title="Units">
        <Table data={units} columns={this.columns} />
        <Actions
          unitId={actions}
          onClose={this.closeActions}
          deleteUnit={this.props.deleteUnit}
        />
        <FloatingActionButton
          className={classes.fab}
          color="secondary"
          component={Link}
          to="/units/new"
        >
          <AddIcon />
        </FloatingActionButton>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  units: getUnits(state),
});

export default compose(
  connect(
    mapStateToProps,
    { listUnits, deleteUnit }
  ),
  withStyles(styles)
)(Units);
