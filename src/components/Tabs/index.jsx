import React from 'react';
import { Link } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TabsComponent = ({ tabs, value, id }) => (
  <AppBar id={id} position="static" color="default">
    <Tabs
      value={value}
      // onChange={this.handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabs.map(tab => (
        <Tab
          key={tab.label}
          label={tab.label}
          value={tab.path}
          component={Link}
          to={tab.path}
        />
      ))}
    </Tabs>
  </AppBar>
);

export default TabsComponent;
