import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import { getNomination, updateNomination } from 'state/modules/nomination';
import Dialog from 'components/Dialog';
import NominationForm from 'forms/Nomination';
import { nominationShape } from 'shapes/nomination';
import { selectNomination } from 'selectors/nomination';

class EditNomination extends React.Component {
  componentDidMount() {
    const { nominationId } = this.props;
    this.props.getNomination(nominationId);
  }

  render() {
    const { nomination } = this.props;

    return (
      <Dialog titleId="add-nomination-title" maxWidth="sm">
        <NominationForm initialValues={nomination} />
      </Dialog>
    );
  }
}

EditNomination.propTypes = {
  nomination: nominationShape.isRequired,
  nominationId: PropTypes.string.isRequired,
  getNomination: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  nomination: selectNomination(state, props),
});

export default compose(
  connect(
    mapStateToProps,
    { getNomination, updateNomination }
  )
)(EditNomination);
