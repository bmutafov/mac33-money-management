import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// style & material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// queries
import { addUserMutation, getUsersQuery } from '../queries/queries';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addUserMutation({
      variables: {
        name: this.state.name
      },
      refetchQueries: [
        { query: getUsersQuery },
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
                <TextField
                  label="Username"
                  variant="outlined"
                  onChange={(e) => this.setState({
                    name: e.target.value
                  })}
                />
              </td>
              <td><Button variant="contained" color="primary"> Add user </Button></td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

export default graphql(addUserMutation, { name: 'addUserMutation' })(AddUser);

