import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Import queries
import { getExpensesQuery } from '../queries/queries';

class DisplayExpenses extends Component {
  timestampToDate(timestamp) {
    let date = new Date(parseFloat(timestamp * 1000));
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
  }

  displayExpenses() {
    let { data } = this.props;
    if (data.loading) {
      return (
        <div> loading expenses... </div>
      );
    } else {
      return data.expenses.map(expense => {
        return (
          <li key={expense.id}> <b>{expense.payer.name}</b> paid {expense.amount} on {this.timestampToDate(expense.date)}</li>
        )
      });
    }
  }

  render() {
    return (
      <div className="display-expenses">
        <ul>
          {this.displayExpenses()}
        </ul>
      </div>
    );
  }
}

export default graphql(getExpensesQuery)(DisplayExpenses);
