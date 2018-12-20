import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import Page from 'components/Page';
import Loading from 'components/Loading';
import { getElection } from 'state/modules/election';
import { selectElection } from 'selectors/election';
import { electionShape } from 'shapes/election';

class Election extends React.Component {
  static propTypes = {
    electionId: PropTypes.string.isRequired,
    getElection: PropTypes.func.isRequired,
    election: electionShape.isRequired,
  };

  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElection(electionId);
  }

  render() {
    const { election, loading } = this.props;
    return (
      <Page title="Election">
        <h2>Election Overview</h2>
        <Loading loading={loading}>
          <Fragment>
            {election && election.status === 'Requested' && (
              <Fragment>
                <h4>Requested Dates</h4>
                <ul>
                  {election.requestedDates.map(reqDate => (
                    <li key={reqDate}>
                      {format(reqDate, 'MMMM Do, YYYY', {
                        awareOfUnicodeTokens: true,
                      })}
                    </li>
                  ))}
                </ul>
              </Fragment>
            )}
            {election && election.status !== 'Requested' && (
              <h3>
                Date:
                {format(election.date, 'MMMM Do, YYYY', {
                  awareOfUnicodeTokens: true,
                })}
              </h3>
            )}
          </Fragment>
        </Loading>
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => ({
  election: selectElection(state, props),
  loading: state.loading.election,
});

export default connect(
  mapStateToProps,
  { getElection }
)(Election);
