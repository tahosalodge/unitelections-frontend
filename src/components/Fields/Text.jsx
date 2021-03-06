import React from 'react';
import { FastField } from 'formik';
import MuiTextField from '@material-ui/core/TextField';

const TextField = props => (
  <FastField
    {...props}
    render={({ field, form: { touched, errors } }) => (
      <MuiTextField
        {...props}
        {...field}
        error={touched[field.name] && !!errors[field.name]}
        helperText={
          touched[field.name] && errors[field.name]
            ? errors[field.name]
            : props.helperText
        }
        value={field.value || ''}
      />
    )}
  />
);

TextField.defaultProps = {
  type: 'text',
};

export default TextField;
