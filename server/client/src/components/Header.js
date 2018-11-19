import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default props =>
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Mac & Cheese Money Management v2
            </Typography>
    </Toolbar>
  </AppBar>