import React, { Fragment, Component } from 'react'
import MonthlySpent from './MonthlySpent';
import WeeklySpent from './WeeklySpent';
import { getWeeks, getDateXDaysAgo } from '../helpers/helpers'
import { AppBar, Tabs, Tab } from '@material-ui/core'
export default class Graphs extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render = () => {
    const { value } = this.state;
    return (
      <Fragment>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange} fullWidth indicatorColor="primary" textColor="primary">
            <Tab label="Weekly" />
            <Tab label="Monthly" />
          </Tabs>
        </AppBar>
        {value === 0 && <WeeklySpent after={getDateXDaysAgo(7)} />}
        {value === 1 && <MonthlySpent after={getWeeks()} />}
      </Fragment>
    );
  }
}