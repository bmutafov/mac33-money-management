import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// material ui
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';



// queries
import { getUsersQuery, addExpenseMutation, getExpensesQuery, addDebtMutation, getDebtsQuery, getMoneyOwedQuery } from '../queries/queries';

import UserSelect from './UserSelect';
import ExpenseDialog from './ExpenseDialog';

class AddExpense extends Component {
  payingUsers = [];
  constructor(props) {
    super(props);
    this.state = {
      payerName: '',
      payerId: 'default',
      amount: 0,
      description: '',
      open: false,
    }
  }

  handleClickOpen = () => {
    if (this.state.payerId === "default") {
      return;
    }
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render = () => {
    return (
      <form className="add-expense">{/*onSubmit={this.submitForm.bind(this)}*/}
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
              <td style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} > Add Expense </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <ExpenseDialog
          formState={this.state}
          handleClose={this.handleClose}
        />
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
