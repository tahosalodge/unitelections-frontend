import React from 'react';
import { FastField } from 'formik';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const SelectField = ({ options, label, className, ...props }) => (
  <FastField
    {...props}
    render={({ field, form: { touched, errors }, disabled = false }) => (
      <FormControl
        className={className}
        error={touched[field.name] && !!errors[field.name]}
      >
        <InputLabel htmlFor={props.name}>{label}</InputLabel>
        <Select
          {...props}
          {...field}
          native
          value={field.value || ''}
          disabled={disabled}
        >
          <option value="" />
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {(errors[field.name] || props.helperText) && (
          <FormHelperText>
            {errors[field.name] ? errors[field.name] : props.helperText}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);

export default SelectField;
