import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// material ui
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

// queries
import { getUsersQuery, addExpenseMutation, getExpensesQuery, addDebtMutation, getDebtsQuery, getMoneyOwedQuery } from '../queries/queries';

import UserSelect from './UserSelect';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payerName: '',
      payerId: 'default',
      amount: 0,
      description: '',
    }
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.payerId === "default") {
      return;
    }
    this.props.addExpenseMutation({
      variables: {
        payerId: this.state.payerId,
        amount: parseFloat(this.state.amount),
        date: Math.round(new Date().getTime() / 1000).toString(),
        description: this.state.description,
      },
      refetchQueries: [
        { query: getExpensesQuery },
      ]
    }).then((result) => {
      let expense = result.data.addExpense;
      let { users } = this.props.getUsersQuery;
      users = users.filter(u => u.id !== expense.payer.id);
      for (let i = 0; i < users.length; i++) {
        this.props.addDebtMutation({
          variables: {
            lenderId: expense.payer.id,
            debtorId: users[i].id,
            expenseId: expense.id,
            amount: Math.round(parseFloat(expense.amount / (users.length + 1)) * 100) / 100,
          },
          refetchQueries: i === users.length - 1 ? [
            { query: getDebtsQuery },
            { query: getMoneyOwedQuery },
          ] : undefined,
        })
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <form className="add-expense" onSubmit={this.submitForm.bind(this)}>
        <table>
          <tbody>
            <tr>
              <td>
                <UserSelect
                  label="Payer"
                  helperText="Select who paid the expense"
                  handler={(e) => { this.setState({ payerId: e.target.value }) }} />
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  variant="outlined"
                  label="Amount"
                  margin="normal"
                  helperText="The total amount of the expense"
                  value={this.state.amount}
                  onChange={(e) => { this.setState({ amount: e.target.value }) }}
                  style={{ width: 300 }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  label="Expense description"
                  placeholder="Description"
                  helperText="Add short description about the expense"
                  multiline
                  rowsMax="4"
                  margin="normal"
                  variant="outlined"
                  style={{ width: 300 }}
                  onChange={(e) => { this.setState({ description: e.target.value }) }}
                />
              </td>
            </tr>
            <tr>
              <td><Button variant="contained" color="primary" type="submit"> Add Expense </Button></td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: 'getUsersQuery' }),
  graphql(addExpenseMutation, { name: 'addExpenseMutation' }),
  graphql(addDebtMutation, { name: 'addDebtMutation' }),
  graphql(getMoneyOwedQuery, { name: 'getMoneyOwedQuery' }),
)(AddExpense);
