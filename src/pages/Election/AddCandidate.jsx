import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import Dialog from 'components/Dialog';
import CandidateForm from 'forms/Candidate';
import { createCandidate } from 'state/modules/candidate';
import { electionShape } from 'shapes/election';

const AddCandidate = ({
  election: { _id: electionId, unit, chapter },
  ...props
}) => (
  <Dialog titleId="add-candidate-title" maxWidth="sm">
    <CandidateForm
      onSave={props.createCandidate}
      initialValues={{ election: electionId, unit, chapter }}
      cancelPath={`/elections/${electionId}/candidates`}
    />
  </Dialog>
);

AddCandidate.propTypes = {
  election: electionShape.isRequired,
  createCandidate: PropTypes.func.isRequired,
};

export default compose(
  connect(
    null,
    { createCandidate }
  )
)(AddCandidate);
