import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import Dialog from 'components/Dialog';
import NominationForm from 'forms/Nomination';
import { createNomination } from 'state/modules/nomination';
import { electionShape } from 'shapes/election';

const AddNomination = ({
  election: { _id: electionId, unit, chapter },
  unitType,
  ...props
}) => (
  <Dialog titleId="add-candidate-title" maxWidth="sm">
    <NominationForm
      onSave={props.createNomination}
      initialValues={{ election: electionId, unit, chapter, unitType }}
      cancelPath={`/elections/${electionId}/nomination`}
    />
  </Dialog>
);

AddNomination.propTypes = {
  election: electionShape.isRequired,
  createNomination: PropTypes.func.isRequired,
  unitType: PropTypes.string.isRequired,
};

export default compose(
  connect(
    null,
    { createNomination }
  )
)(AddNomination);
