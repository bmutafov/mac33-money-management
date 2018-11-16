import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// queries
import { getUsersQuery, addExpenseMutation, getExpensesQuery } from '../queries/queries';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payerId: '',
      amount: 0,
    }
  }

  displayUsers() {
    let { getUsersQuery } = this.props;
    if (getUsersQuery.loading) {
      return (<option>loading users...</option>);
    } else {
      return getUsersQuery.users.map(user => {
        return (<option key={user.id} value={user.id}>{user.name}</option>)
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addExpenseMutation({
      variables: {
        payerId: this.state.payerId,
        amount: this.state.amount,
        date: Math.round(new Date().getTime() / 1000).toString(),
      },
      refetchQueries: [
        { query: getExpensesQuery },
      ]
    })
  }

  today() {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  render() {
    return (
      <form className="add-expense" onSubmit={this.submitForm.bind(this)}>
        <table>
          <tbody>
            <tr>
              <td>Payer:</td>
              <td><select onChange={(e) => { this.setState({ payerId: e.target.value }) }}>{this.displayUsers()}</select></td>
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
)(AddExpense);
