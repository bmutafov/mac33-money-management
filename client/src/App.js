import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddUser from './components/AddUser';
import DisplayUsers from './components/DisplayUsers';
import AddExpense from './components/AddExpense';
import DisplayExpenses from './components/DisplayExpenses';
import DisplayDebts from './components/DisplayDebts';
import DisplayMoneyOwed from './components/DisplayMoneyOwed';
import PayDebt from './components/PayDebt';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DebtTable from './components/DebtTable';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphiql'
})

class App extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <ApolloProvider client={client}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Mac & Cheese Money Management v2
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="App">
          <Grid container spacing={8} className="centered">
            <Grid item xs={2} style={{ minWidth: 320 }}>
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
                  <Paper>
                    <AppBar position="static" color="default">
                      <Tabs value={value} onChange={this.handleChange} fullWidth>
                        <Tab label="Total money owed" />
                        <Tab label="Debts history" />
                        <Tab label="Expenses history" />
                      </Tabs>
                    </AppBar>
                    {value === 0 && <DisplayMoneyOwed />}
                    {value === 1 && <DisplayDebts />}
                    {value === 2 && <DisplayExpenses />}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} style={{ minWidth: 320 }}>
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
        </div>
      </ApolloProvider >
    );
  }
}

export default App;
