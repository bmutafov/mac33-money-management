import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import TextField from '@material-ui/core/TextField';

import { getUsersQuery } from '../queries/queries';
import { getUsersAsOptions } from '../helpers/helpers';

class UserSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payerId: '',
    }
  }

  render() {
    return (
      <TextField
        select
        label={this.props.label}
        value={this.state.payerId}
        helperText={this.props.helperText}
        onChange={(e) => { this.props.handler(e); this.setState({ payerId: e.target.value }) }}
        margin="normal"
        variant="outlined"
      >
        {getUsersAsOptions(this.props)}
      </TextField>
    );
  }
}

export default graphql(getUsersQuery, { name: 'getUsersQuery' })(UserSelect);
