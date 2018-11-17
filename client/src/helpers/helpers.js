import React from 'react';

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
    return (<option>loading users...</option>);
  } else {
    return getUsersQuery.users.map(user => {
      return (<option key={user.id} value={user.id}>{user.name}</option>)
    });
  }
}