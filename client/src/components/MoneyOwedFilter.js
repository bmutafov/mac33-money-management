import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo';
import { getUsersQuery } from '../queries/queries';
import { Avatar, AppBar } from '@material-ui/core';
import colors from '../helpers/colors'
import { withStyles } from "@material-ui/core/styles";
import UserSelect from './UserSelect';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
      <div >
        <AppBar position="static" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }} color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Filter
          </Typography>
          </Toolbar>
          <UserSelect
            label="Debtor"
            helperText="Who owes money"
            width="220px"
            includeDefault
            defaultValue='any'
            variant="standard"
            handler={this.handleChange('debtor')}
          />
          <ArrowForward style={{ marginTop: 40, marginLeft: 10, marginRight: 10 }} />
          <UserSelect
            label="Lender"
            helperText="Who revieves money"
            width="220px"
            includeDefault
            defaultValue='any'
            variant="standard"
            handler={this.handleChange('lender')}
          />
        </AppBar>
      </div>
    )
  }
}

export default graphql(getUsersQuery, { name: 'getUsersQuery' })(MoneyOwedFilter);