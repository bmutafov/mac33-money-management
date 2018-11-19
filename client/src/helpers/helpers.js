import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import colors from '../helpers/colors'


export const timestampToDate = (timestamp) => {
  let date = new Date(parseFloat(timestamp * 1000));
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
};

export const timestampToSimpleDate = (timestamp) => {
  let date = new Date(parseInt(timestamp * 1000));
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const weekdaysBeforeToday = () => {
  let weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let date = new Date().getDay();
  return weekdayNames.splice(date + 1, 7 - date - 1).concat(weekdayNames);
}

export const getDateXDaysAgo = (x) => {
  let date = new Date();
  date.setDate(date.getDate() - x);
  return new String(Math.round(date.getTime() / 1000));
}

export const sumPartialAmounts = (items, prop) => {
  return items.reduce((a, b) => {
    return parseFloat(a) + parseFloat(b[prop]);
  }, 0);
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