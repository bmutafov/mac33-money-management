import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// style & material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// queries
import { addUserMutation, getUsersQuery } from '../queries/queries';
import ColorSelect from './ColorSelect';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
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
        <table>
          <tbody>
            <tr>
              <td>
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
              </td>
            </tr>
            <tr>
              <td>
                <ColorSelect
                  label="User color"
                  helperText="Select representitive color"
                  handler={(e) => this.setState({
                    color: e.target.value,
                  })}
                />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary" type="submit"> Add user </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

export default graphql(addUserMutation, { name: 'addUserMutation' })(AddUser);

