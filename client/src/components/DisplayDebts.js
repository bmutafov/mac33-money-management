import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ArrowRightAlt from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';

// Import queries
import { getDebtsQuery } from '../queries/queries';


class DisplayDebts extends Component {
  displayDebts() {
    let { data } = this.props;
    if (data.loading) {
      return (
        <div> loading debts... </div>
      );
    } else {
      return data.debts.map(debt => {
        return (
          <ListItem key={debt.id}>
            <Avatar>{debt.debtor.name.charAt(0)}</Avatar>
            <ArrowRightAlt />
            <Avatar>{debt.lender.name.charAt(0)}</Avatar>

            <ListItemText primary={`${debt.amount}€ `} secondary={`${debt.debtor.name} to ${debt.lender.name}`} />
          </ListItem>
        )
      });
    }
  }

  render() {
    return (
      <div className="display-users">
        <Typography variant="h5" gutterBottom className="heading">
          Previous debts from expenses
        </Typography>
        <List>
          {this.displayDebts()}
        </List>
      </div>
    );
  }
}

export default graphql(getDebtsQuery)(DisplayDebts);
