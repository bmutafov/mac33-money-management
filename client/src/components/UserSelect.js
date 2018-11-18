import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { getUsersQuery } from '../queries/queries';
import { getUsersAsOptions } from '../helpers/helpers';

class UserSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payerId: props.defaultValue || '',
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
        variant="outlined"
      >
        {this.props.includeDefault && <MenuItem key="any" value="any">Any</MenuItem>}
        {getUsersAsOptions(this.props)}
      </TextField>
    );
  }
}

export default graphql(getUsersQuery, { name: 'getUsersQuery' })(UserSelect);
