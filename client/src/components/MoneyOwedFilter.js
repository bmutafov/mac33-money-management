import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo';
import { getUsersQuery } from '../queries/queries';
import { Avatar } from '@material-ui/core';
import colors from '../helpers/colors'
import { withStyles } from "@material-ui/core/styles";
import UserSelect from './UserSelect';
import ArrowForward from '@material-ui/icons/ArrowForward';

class MoneyOwedFilter extends Component {
  state = {
    debtor: 'any',
    lender: 'any',
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value,
    }, () => this.props.stateChanged(this.state));
  }

  render = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <UserSelect
          label="Debtor"
          helperText="Who owes money"
          width="220px"
          includeDefault
          defaultValue='any'
          handler={this.handleChange('debtor')}
        />
        <ArrowForward style={{ marginTop: 30 }} />
        <UserSelect
          label="Lender"
          helperText="Who revieves money"
          width="220px"
          includeDefault
          defaultValue='any'
          handler={this.handleChange('lender')}
        />
      </div>
    )
  }
}

export default graphql(getUsersQuery, { name: 'getUsersQuery' })(MoneyOwedFilter);