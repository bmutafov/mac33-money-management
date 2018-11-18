import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ArrowRightAlt from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import colors from '../helpers/colors'
import CircularProgress from '@material-ui/core/CircularProgress';

// Import queries
import { getMoneyOwedQuery } from '../queries/queries';

class DisplayMoneyOwed extends Component {
  parseData(data) {
    let dataCpy = [...data];
    let res = [];
    for (let i = 0; i < dataCpy.length; i++) {
      // make a copy and find the owed back money
      let current = dataCpy[i];
      let moneyOwedBack = dataCpy.find(m => m.lender.id === current.debtor.id && m.debtor.id === current.lender.id) || null;

      // calculate the total amount and who owes to who
      // and if the money owed back amount is greater skip and do the action
      // on the other element
      if (moneyOwedBack === null) {
        res.push(current);
      } else if (current.amount > moneyOwedBack.amount) {
        res.push({
          id: current.id,
          lender: current.lender,
          debtor: current.debtor,
          amount: Math.round((current.amount - moneyOwedBack.amount) * 100) / 100,
        });

        // delete other element from copy to avoid doubling the result element
        dataCpy.splice(dataCpy.indexOf(moneyOwedBack), 1);
      }
    }
    return res;
  }

  displayMoneyOwed() {
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
      let parsedData = this.parseData(data.moneyOwed);
      return parsedData.map(moneyOwed => {
        return (
          <ListItem key={moneyOwed.id}>
            <Avatar style={{ background: colors[moneyOwed.debtor.color || 0].hex }}>{moneyOwed.debtor.name.charAt(0)}</Avatar>
            <ArrowRightAlt />
            <Avatar style={{ background: colors[moneyOwed.lender.color || 0].hex }}>{moneyOwed.lender.name.charAt(0)}</Avatar>

            <ListItemText primary={`${moneyOwed.amount}€ `} secondary={`${moneyOwed.debtor.name} to ${moneyOwed.lender.name}`} />
          </ListItem>
        )
      });
    }
  }

  render() {
    return (
      <div className="display-money-owed">
        <List style={{ position: 'relative' }}>
          {this.displayMoneyOwed()}
        </List>
      </div>
    );
  }
}

export default graphql(getMoneyOwedQuery)(DisplayMoneyOwed);
