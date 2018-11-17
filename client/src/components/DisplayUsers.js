import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import FolderIcon from '@material-ui/icons/Folder';

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
          <ListItem key={user.id}>
            <ListItemIcon>
              <Avatar>{user.name.charAt(0)}</Avatar>
            </ListItemIcon>
            <ListItemText
              primary={`${user.name}`}
              secondary={user.id}
            />
          </ListItem>
        )
      });
    }
  }


  render() {
    return (
      <List>
        {this.displayUsers()}
      </List>
    );
  }
}

export default graphql(getUsersQuery)(DisplayUsers);
