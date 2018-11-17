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

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphiql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom className="heading"> Mac & Cheese Money Management v2 </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Paper><DisplayUsers /></Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper><AddUser /></Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper><AddExpense /></Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper><PayDebt /></Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Paper><DisplayMoneyOwed /></Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper><DisplayDebts /></Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper><DisplayExpenses /></Paper>
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
