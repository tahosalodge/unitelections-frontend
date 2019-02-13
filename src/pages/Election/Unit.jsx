import React from 'react';
import Page from 'components/Page';
import { unitShape } from 'shapes/unit';
import Unit from 'components/Unit';

const ElectionUnitInformation = ({ unit }) => (
  <Page title="Unit Information" fullwidth squareTop noShadow>
    <Unit unit={unit} />
  </Page>
);

ElectionUnitInformation.propTypes = {
  unit: unitShape.isRequired,
};

export default ElectionUnitInformation;
