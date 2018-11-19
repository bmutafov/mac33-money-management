import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// material ui
import UserSelect from './UserSelect';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Snackbar from '@material-ui/core/Snackbar';

// queries
import { getUsersQuery, payDebtMutation, getMoneyOwedQuery } from '../queries/queries';
import { FormGroup, Typography } from '@material-ui/core';

class PayDebt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lenderId: 'default',
      debtorId: 'default',
      amount: 0,
      open: false,
    }
  }

  submitForm = (e) => {
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
    }).then((result) => {
      this.openSnackbar();
    }).catch((err) => {

    });;
  }

  openSnackbar = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render = () => {
    return (
      <form className="add-user" onSubmit={this.submitForm.bind(this)}>
        <FormGroup style={{ padding: 3 }}>
          <Typography variant="h5" style={{ textAlign: 'center' }}>
            PAY DEBTS
          </Typography>
          <UserSelect
            label="Debtor"
            helperText="Select who gives money"
            handler={(e) => { this.setState({ debtorId: e.target.value }) }}
          />

          <UserSelect
            label="Lender"
            helperText="Select who recieves money"
            handler={(e) => { this.setState({ lenderId: e.target.value }) }}
          />

          <TextField
            variant="outlined"
            label="Amount"
            margin="normal"
            helperText="The amount of money given"
            value={this.state.amount}
            style={{ width: 300 }}
            onChange={(e) => { this.setState({ amount: e.target.value }) }}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
          />

          <Button variant="contained" color="primary" type="submit">
            Pay Debt
            <AttachMoney style={{ marginLeft: 10 }} />
          </Button>
        </FormGroup>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Debt paid successfully</span>}

        />
      </form>
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: 'getUsersQuery' }),
  graphql(payDebtMutation, { name: 'payDebtMutation' }),
)(PayDebt);
