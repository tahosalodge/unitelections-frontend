import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckboxGroup = ({ values, options, name, getLabel, classes }) => (
  <FieldArray
    name={name}
    render={arrayHelpers => (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Elected Candidates</FormLabel>
        <FormGroup>
          {options.map(option => {
            const control = (
              <Checkbox
                name={name}
                type="checkbox"
                value={option._id}
                checked={values[name].includes(option._id)}
                onChange={e => {
                  if (e.target.checked) {
                    arrayHelpers.push(option._id);
                  } else {
                    const idx = values[name].indexOf(option._id);
                    arrayHelpers.remove(idx);
                  }
                }}
              />
            );
            return (
              <FormControlLabel control={control} label={getLabel(option)} />
            );
          })}
        </FormGroup>
      </FormControl>
    )}
  />
);

CheckboxGroup.propTypes = {
  values: PropTypes.shape({}).isRequired,
  getLabel: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  name: PropTypes.string.isRequired,
};

CheckboxGroup.defaultProps = {
  getLabel: option => `${option.fname} ${option.lname}`,
};

export default CheckboxGroup;
