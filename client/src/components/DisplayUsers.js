import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Import queries
import { getUsersQuery } from '../queries/queries';

class DisplayUsers extends Component {
  displayUsers() {
    let { data } = this.props;
    if (data.loading) {
      return (
        <div> loading users... </div>
      );
    } else {
      return data.users.map(user => {
        return (
          <li key={user.id}>{user.name}</li>
        )
      });
    }
  }

  render() {
    return (
      <div className="display-users">
        <ul>
          {this.displayUsers()}
        </ul>
      </div>
    );
  }
}

export default graphql(getUsersQuery)(DisplayUsers);
