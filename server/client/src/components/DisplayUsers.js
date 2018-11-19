import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import colors from '../helpers/colors'
import CircularProgress from '@material-ui/core/CircularProgress';

// Import queries
import { getUsersQuery } from '../queries/queries';

class DisplayUsers extends Component {
  displayUsers() {
    let { data } = this.props;
    if (data.loading) {
      return (
        <CircularProgress size={40}
          left={-20}
          top={10}
          status={'loading'}
          style={{ marginLeft: '50%' }}
          color="secondary"
        />
      );
    } else {
      return data.users.map(user => {
        return (
          <ListItem key={user.id}>
            <ListItemIcon>
              <Avatar style={{ background: colors[user.color || 0].hex }}>{user.name.charAt(0)}</Avatar>
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
      <List style={{ position: 'relative' }}>
        {this.displayUsers()}
      </List>
    );
  }
}

export default graphql(getUsersQuery)(DisplayUsers);
