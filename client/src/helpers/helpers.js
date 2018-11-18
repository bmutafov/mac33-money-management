import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import colors from '../helpers/colors'


export const timestampToDate = (timestamp) => {
  let date = new Date(parseFloat(timestamp * 1000));
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
};

export const today = () => {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export const getUsersAsOptions = (props) => {
  let { getUsersQuery } = props;
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