import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// style & material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PersonAdd from '@material-ui/icons/PersonAdd';

// queries
import { addUserMutation, getUsersQuery } from '../queries/queries';
import ColorSelect from './ColorSelect';
import { FormGroup, Typography } from '@material-ui/core';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: 0,
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addUserMutation({
      variables: {
        name: this.state.name,
        color: parseInt(this.state.color),
      },
      refetchQueries: [
        { query: getUsersQuery },
      ],
    });
  }

  render() {
    return (
      <form className="add-user" onSubmit={this.submitForm.bind(this)}>
        <Typography variant="h5" style={{ textAlign: 'center' }}>
          ADD USER
        </Typography>
        <FormGroup style={{ padding: 3 }}>
          <TextField
            label="Username"
            variant="outlined"
            margin="dense"
            helperText="The name of the user"
            style={{ width: 300 }}
            onChange={(e) => this.setState({
              name: e.target.value
            })}
          />
          <ColorSelect
            label="User color"
            helperText="Select representitive color"
            handler={(e) => this.setState({
              color: e.target.value,
            })}
          />
          <Button variant="contained" color="primary" type="submit">
            Add user
            <PersonAdd style={{ marginLeft: 10 }} />
          </Button>
        </FormGroup>
      </form>
    );
  }
}

export default graphql(addUserMutation, { name: 'addUserMutation' })(AddUser);

