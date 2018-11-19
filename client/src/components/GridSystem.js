import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import DisplayUsers from './DisplayUsers';
import AddUser from './AddUser';
import InfoBlock from './InfoBlock';
import AddExpense from './AddExpense';
import PayDebt from './PayDebt';

export default props =>
  <Grid container spacing={8} className="centered">
    <Grid item xs={2} style={{ minWidth: 315 }}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper><DisplayUsers /></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper><AddUser /></Paper>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={6}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <InfoBlock />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={2} style={{ minWidth: 315 }}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper><AddExpense /></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper><PayDebt /></Paper>
        </Grid>
      </Grid>
    </Grid>
  </Grid>