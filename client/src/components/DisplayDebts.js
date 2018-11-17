import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Import queries
import { getDebtsQuery } from '../queries/queries';

import { timestampToDate } from '../helpers/helpers';

class DisplayDebts extends Component {
  displayDebts() {
    let { data } = this.props;
    if (data.loading) {
      return (
        <div> loading debts... </div>
      );
    } else {
      return data.debts.map(debt => {
        return (
          <li key={debt.id}><b>{debt.debtor.name}</b> owes <b>{debt.lender.name}</b> ({debt.amount} euros) from expense on {timestampToDate(debt.expense.date)}</li>
        )
      });
    }
  }

  render() {
    return (
      <div className="display-users">
        <ul>
          {this.displayDebts()}
        </ul>
      </div>
    );
  }
}

export default graphql(getDebtsQuery)(DisplayDebts);
