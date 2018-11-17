import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Import queries
import { getExpensesQuery } from '../queries/queries';

import { timestampToDate } from '../helpers/helpers';

class DisplayExpenses extends Component {
  displayExpenses() {
    let { data } = this.props;
    if (data.loading) {
      return (
        <div> loading expenses... </div>
      );
    } else {
      return data.expenses.map(expense => {
        return (
          <li key={expense.id}> <b>{expense.payer.name}</b> paid {expense.amount} on {timestampToDate(expense.date)}</li>
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
