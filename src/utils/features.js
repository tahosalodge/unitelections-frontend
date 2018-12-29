/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { connect } from 'react-redux';
import {
  Feature as FeatureBase,
  FeatureToggles,
} from '@paralleldrive/react-feature-toggles';
import { getManageableChapters, getIsAdmin } from 'selectors/auth';

export const SCHEDULE_ELECTIONS = 'scheduleElections';
export const IS_ADMIN = 'isAdmin';

const mapStateToProps = state => ({
  features: [
    ...(!!getManageableChapters(state).length || getIsAdmin(state)
      ? [SCHEDULE_ELECTIONS]
      : []),
    ...(getIsAdmin(state) ? [IS_ADMIN] : []),
  ],
});

export const ConnectedFeatureProvider = connect(mapStateToProps)(
  FeatureToggles
);

export const Feature = ({ children, ...props }) => (
  <FeatureBase activeComponent={() => children} {...props} />
);
