import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import colors from '../helpers/colors'

import { getUsersQuery } from '../queries/queries';

class UserSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payerId: props.defaultValue || '',
    }
  }
  getUsersAsOptions = () => {
    let { getUsersQuery } = this.props;
    if (getUsersQuery.loading) {
      return (<MenuItem>loading users...</MenuItem>);
    } else {
      return getUsersQuery.users.map(user => {
        return (
          <MenuItem key={user.id} value={user.id}>
            <Avatar
              style={
                {
                  background: colors[user.color || 0].hex,
                  width: 24,
                  height: 24,
                  float: 'left',
                  fontSize: 14,
                  marginRight: 10
                }
              }>
              {user.name.charAt(0)}
            </Avatar>
            {user.name}
          </MenuItem>
        )
      });
    }
  }

  render() {
    return (
      <TextField
        select
        label={this.props.label}
        value={this.state.payerId}
        helperText={this.props.helperText}
        style={{ width: this.props.width || 300 }}
        onChange={(e) => { this.props.handler(e); this.setState({ payerId: e.target.value }) }}
        margin="normal"
        variant={this.props.variant || "outlined"}
      >
        {this.props.includeDefault && <MenuItem key="any" value="any">Any</MenuItem>}
        {this.getUsersAsOptions(this.props)}
      </TextField>
    );
  }
}

export default graphql(getUsersQuery, { name: 'getUsersQuery' })(UserSelect);
