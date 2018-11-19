import React, { Fragment, Component } from "react";
import { Paper, AppBar, Tabs, Tab } from '@material-ui/core';
import ExpansionExpenses from "./ExpansionExpenses";
import DisplayMoneyOwed from "./DisplayMoneyOwed";
import Graphs from "./Graphs";

export default class InfoBlock extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render = () => {
    const { value } = this.state;
    return (<Fragment>
      <Paper>
        <AppBar position="static" color="primary">
          <Tabs value={value} onChange={this.handleChange} fullWidth>
            <Tab label="Total money owed" />
            <Tab label="Expenses history" />
            <Tab label="Graphs" />
          </Tabs>
        </AppBar>
        {value === 0 && <DisplayMoneyOwed />}
        {value === 1 && <ExpansionExpenses />}
        {value === 2 && <Graphs />}
      </Paper>
    </Fragment>);
  }
}