/**
 * WIP, checkboxes are broken in formik
 */
import React from 'react';
import { FastField } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckboxField = ({ value, ...props }) => (
  <FastField
    {...props}
    render={({ field }) => {
      const control = (
        <Checkbox
          {...props}
          {...field}
          id={field.name}
          checked={typeof field.value === 'undefined' ? value : field.value}
          value={typeof field.value === 'undefined' ? value : field.value}
        />
      );
      return <FormControlLabel control={control} label={props.label} />;
    }}
  />
);

CheckboxField.defaultProps = {
  type: 'checkbox',
};

export default CheckboxField;
