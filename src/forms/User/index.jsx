import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Form, FieldArray } from 'formik';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from 'components/Fields/Text';
import SelectField from 'components/Fields/Select';
import { selectUser } from 'selectors/user';
import userShape from 'shapes/user';
import { arrayOfSelections, arrayOfStrings } from 'shapes/fields';

import {
  selectUnitsForDropdown,
  selectElectionsForDropdown,
  selectChaptersForDropdown,
  selectItemsForModel,
} from './selectors';

const UserForm = ({
  fullScreen,
  user,
  elections,
  units,
  chapters,
  id,
  onSubmit,
  title,
  navigate,
}) => (
  <Dialog
    fullScreen={fullScreen}
    open
    onClose={() => navigate('/admin/users')}
    aria-labelledby={id}
  >
    <Formik onSubmit={onSubmit} initialValues={user}>
      {({ handleSubmit, values }) => (
        <Form>
          <DialogTitle id={id}>{title}</DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="fname"
                  label="First Name"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="lname"
                  label="Last Name"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="email"
                  label="Email Address"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FieldArray
                  name="belongsTo"
                  render={arrayHelpers => (
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        {values.belongsTo &&
                          values.belongsTo.map((relationship, index) => (
                            // eslint-disable-next-line
                            <Grid container key={index}>
                              <Grid item xs={2}>
                                <SelectField
                                  name={`belongsTo[${index}].model`}
                                  options={['Unit', 'Chapter', 'Election']}
                                />
                              </Grid>
                              <Grid item xs={8}>
                                <SelectField
                                  name={`belongsTo[${index}].organization`}
                                  options={selectItemsForModel(
                                    relationship.model,
                                    {
                                      units,
                                      chapters,
                                      elections,
                                    }
                                  )}
                                  fast={false}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <IconButton
                                  type="button"
                                  color="primary"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <RemoveIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          ))}
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="button"
                          color="primary"
                          variant="contained"
                          onClick={() =>
                            arrayHelpers.push({
                              model: '',
                              organization: '',
                              canManage: false,
                            })
                          }
                        >
                          Add relationship
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => navigate('/admin/users')} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              color="primary"
              autoFocus
            >
              {title}
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  </Dialog>
);

UserForm.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  user: userShape,
  elections: arrayOfStrings.isRequired,
  units: arrayOfSelections.isRequired,
  chapters: arrayOfSelections.isRequired,
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  user: {},
};

const mapStateToProps = (state, props) => ({
  units: selectUnitsForDropdown(state),
  elections: selectElectionsForDropdown(state),
  chapters: selectChaptersForDropdown(state),
  user: selectUser(state, props),
});

export default compose(
  connect(mapStateToProps),
  withMobileDialog()
)(UserForm);
