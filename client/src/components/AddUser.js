import React, { Component } from 'react';
import { graphql } from 'react-apollo';

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
              <td>User name:</td>
              <td><input type="text" onChange={(e) => this.setState({
                name: e.target.value
              })} /></td>
            </tr>
            <tr>
              <td></td>
              <td><button> Add user</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

export default graphql(addUserMutation, { name: 'addUserMutation' })(AddUser);
