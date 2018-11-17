import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Import queries
import { getMoneyOwedQuery } from '../queries/queries';

class DisplayMoneyOwed extends Component {
  parseData(data) {
    let dataCpy = [...data];
    let res = [];
    for (let i = 0; i < dataCpy.length; i++) {
      // make a copy and find the owed back money
      let current = dataCpy[i];
      let moneyOwedBack = dataCpy.find(m => m.lender.id === current.debtor.id && m.debtor.id === current.lender.id);

      // calculate the total amount and who owes to who
      // and if the money owed back amount is greater skip and do the action
      // on the other element
      if (current.amount > moneyOwedBack.amount) {
        current.amount = Math.round((current.amount - moneyOwedBack.amount) * 100) / 100;
        res.push(current);

        // delete other element from copy to avoid doubling the result element
        dataCpy.splice(dataCpy.indexOf(moneyOwedBack), 1);
      }
    }
    return res;
  }

  displayMoneyOwed() {
    let { data } = this.props;
    if (data.loading) {
      return (
        <div> loading money owed... </div>
      );
    } else {
      let parsedData = this.parseData(data.moneyOwed);
      return parsedData.map(moneyOwed => {
        return (
          <li key={moneyOwed.id}> <b>{moneyOwed.debtor.name}</b> owes <b>{moneyOwed.lender.name}</b> a total of {moneyOwed.amount} euros</li>
        )
      });
    }
  }

  render() {
    return (
      <div className="display-money-owed">
        <ul>
          {this.displayMoneyOwed()}
        </ul>
      </div>
    );
  }
}

export default graphql(getMoneyOwedQuery)(DisplayMoneyOwed);
