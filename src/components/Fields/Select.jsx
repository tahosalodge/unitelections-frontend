import React from 'react';
import { Field, FastField } from 'formik';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const SelectField = ({ options, label, className, fast, ...props }) => {
  const renderSelect = ({
    field,
    form: { touched, errors },
    disabled = false,
  }) => (
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
        {options &&
          options.map(option =>
            typeof option === 'string' ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
      </Select>
      {((touched[field.name] && errors[field.name]) || props.helperText) && (
        <FormHelperText>
          {touched[field.name] && errors[field.name]
            ? errors[field.name]
            : props.helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
  if (!fast) {
    return <Field {...props} render={renderSelect} />;
  }

  return <FastField {...props} render={renderSelect} />;
};

SelectField.defaultProps = {
  fast: false,
};

export default SelectField;
