import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// queries
import { getUsersQuery, payDebtMutation, getMoneyOwedQuery } from '../queries/queries';

import { getUsersAsOptions } from '../helpers/helpers';

class PayDebt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lenderId: 'default',
      debtorId: 'default',
      amount: 0,
    }
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.lenderId === 'default' || this.state.debtorId === 'default') {
      return;
    }
    this.props.payDebtMutation({
      variables: {
        lenderId: this.state.lenderId,
        debtorId: this.state.debtorId,
        amount: Math.round(parseFloat(this.state.amount) * 100) / 100,
      },
      refetchQueries: [
        { query: getMoneyOwedQuery },
      ],
    });
  }

  render() {
    return (
      <form className="add-user" onSubmit={this.submitForm.bind(this)}>
        <table>
          <tbody>
            <tr>
              <td>Debtor:</td>
              <td>
                <select onChange={(e) => { this.setState({ debtorId: e.target.value }) }}>
                  {/* default option */}
                  <option value="default">Select who gives money</option>

                  {/* load all users */}
                  {getUsersAsOptions(this.props)}
                </select>
              </td>
            </tr>
            <tr>
              <td>Lender:</td>
              <td>
                <select onChange={(e) => { this.setState({ lenderId: e.target.value }) }}>
                  {/* default option */}
                  <option value="default">Select who gets the money</option>

                  {/* load all users */}
                  {getUsersAsOptions(this.props)}
                </select>
              </td>
            </tr>
            <tr>
              <td>Amount:</td>
              <td><input type="text" onChange={(e) => { this.setState({ amount: e.target.value }) }} /></td>
            </tr>
            <tr>
              <td></td>
              <td><button> Pay Debt </button></td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: 'getUsersQuery' }),
  graphql(payDebtMutation, { name: 'payDebtMutation' }),
)(PayDebt);
