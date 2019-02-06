import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import { getCandidate, updateCandidate } from 'state/modules/candidate';
import Dialog from 'components/Dialog';
import CandidateForm from 'forms/Candidate';
import { candidateShape } from 'shapes/candidate';
import { selectCandidate } from 'selectors/candidate';

class EditCandidate extends React.Component {
  componentDidMount() {
    const { candidateId } = this.props;
    this.props.getCandidate(candidateId);
  }

  render() {
    const { candidate } = this.props;

    return (
      <Dialog titleId="add-candidate-title" maxWidth="sm">
        <CandidateForm initialValues={candidate} />
      </Dialog>
    );
  }
}

EditCandidate.propTypes = {
  candidate: candidateShape.isRequired,
  candidateId: PropTypes.string.isRequired,
  getCandidate: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  candidate: selectCandidate(state, props),
});

export default compose(
  connect(
    mapStateToProps,
    { getCandidate, updateCandidate }
  )
)(EditCandidate);
