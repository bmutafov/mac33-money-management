import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// material ui
import UserSelect from './UserSelect';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

// queries
import { getUsersQuery, payDebtMutation, getMoneyOwedQuery } from '../queries/queries';

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
              <td>
                <UserSelect label="Debtor" helperText="Select who gives money" handler={(e) => { this.setState({ debtorId: e.target.value }) }} />
              </td>
              <td>
                <UserSelect label="Lender" helperText="Select who recieves money" handler={(e) => { this.setState({ lenderId: e.target.value }) }} />
              </td>
              <td><TextField
                variant="outlined"
                label="Amount"
                margin="normal"
                helperText="The amount of money given"
                value={this.state.amount}
                onChange={(e) => { this.setState({ amount: e.target.value }) }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              /></td>
              <td><Button variant="contained" color="primary" type="submit"> Pay Debt </Button></td>
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
