import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import Dialog from 'components/Dialog';
import NominationForm from 'forms/Nomination';
import { updateNomination } from 'state/modules/nomination';
import { electionShape } from 'shapes/election';

const AddNomination = ({
  election: { _id: electionId, unit, chapter },
  unitType,
  ...props
}) => (
  <Dialog titleId="add-candidate-title" maxWidth="sm">
    <NominationForm
      onSave={props.updateNomination}
      initialValues={{ election: electionId, unit, chapter, unitType }}
      cancelPath={`/elections/${electionId}/nomination`}
    />
  </Dialog>
);

AddNomination.propTypes = {
  election: electionShape.isRequired,
  updateNomination: PropTypes.func.isRequired,
  unitType: PropTypes.string.isRequired,
};

export default compose(
  connect(
    null,
    { updateNomination }
  )
)(AddNomination);
