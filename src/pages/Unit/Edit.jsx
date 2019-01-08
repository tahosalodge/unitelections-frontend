import React from 'react';
import { connect } from 'react-redux';
import { selectUnit } from 'selectors/unit';
import UnitForm from 'forms/Unit';
import { unitShape } from 'shapes/unit';

const NewUnit = ({ unit }) => <UnitForm unit={unit} />;

NewUnit.propTypes = {
  unit: unitShape.isRequired,
};

const mapStateToProps = (state, props) => ({
  unit: selectUnit(state, props),
});

export default connect(mapStateToProps)(NewUnit);
