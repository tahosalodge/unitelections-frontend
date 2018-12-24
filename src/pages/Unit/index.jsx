import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Chapter from 'components/Chapter';
import { selectUnit } from 'selectors/unit';
import { getUnit } from 'state/modules/unit';
import unitShape from 'shapes/unit';

class Unit extends React.Component {
  static propTypes = {
    unit: unitShape.isRequired,
    getUnit: PropTypes.func.isRequired,
    unitId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    if (!this.props.unit) {
      this.props.getUnit(this.props.unitId);
    }
  }

  render() {
    if (!this.props.unit) {
      return null;
    }
    const {
      unit: { unitType, number, chapter },
    } = this.props;

    return (
      <Page title={`${unitType} ${number}`}>
        <Chapter chapterId={chapter} />
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => ({
  unit: selectUnit(state, props),
});

export default connect(
  mapStateToProps,
  { getUnit }
)(Unit);
