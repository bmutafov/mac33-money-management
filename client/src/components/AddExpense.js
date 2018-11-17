import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// queries
import { getUsersQuery, addExpenseMutation, getExpensesQuery, addDebtMutation, getDebtsQuery, getMoneyOwedQuery } from '../queries/queries';

import { getUsersAsOptions } from '../helpers/helpers'

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payerId: 'default',
      amount: 0,
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
        amount: this.state.amount,
        date: Math.round(new Date().getTime() / 1000).toString(),
      },
      refetchQueries: [
        { query: getExpensesQuery },
        { query: getMoneyOwedQuery },
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
            { query: getDebtsQuery }
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
              <td>Payer:</td>
              <td>
                <select onChange={(e) => { this.setState({ payerId: e.target.value }) }}>
                  {/* default option */}
                  <option value="default">Select who paid the expense</option>

                  {/* load all users */}
                  {getUsersAsOptions(this.props)}
                </select>
              </td>
            </tr>
            <tr>
              <td>Amount:</td>
              <td><input type="text" onChange={(e) => { this.setState({ amount: parseFloat(e.target.value) }) }} /></td>
            </tr>
            <tr>
              <td></td>
              <td><button> Add Expense </button></td>
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
