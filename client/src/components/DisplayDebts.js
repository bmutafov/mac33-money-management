import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ArrowRightAlt from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import InfoIcon from './InfoIcon';
import colors from '../helpers/colors'
import CircularProgress from '@material-ui/core/CircularProgress';

// Import queries
import { getDebtsQuery } from '../queries/queries';
import { timestampToDate } from '../helpers/helpers';


class DisplayDebts extends Component {
  displayDebts() {
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
      return (
        <List>
          {data.debts.map(debt => {
            return (
              <ListItem key={debt.id}>
                <Avatar style={{ background: colors[debt.debtor.color || 0].hex }}>{debt.debtor.name.charAt(0)}</Avatar>
                <ArrowRightAlt />
                <Avatar style={{ background: colors[debt.lender.color || 0].hex }}>{debt.lender.name.charAt(0)}</Avatar>

                <ListItemText primary={`${debt.amount}€ `} secondary={`${debt.debtor.name} to ${debt.lender.name}`} />
                <InfoIcon title={`From '${debt.expense.description}' on ${timestampToDate(debt.expense.date)} with total amount of ${debt.expense.amount}€`} />
              </ListItem>
            )
          })}
        </List>
      );
    }
  }

  render() {
    return (
      <div className="display-users" style={{ position: 'relative' }}>
        {this.displayDebts()}
      </div>
    );
  }
}

export default graphql(getDebtsQuery)(DisplayDebts);
