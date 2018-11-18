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
import MoneyOwedFilter from './MoneyOwedFilter';

class DisplayMoneyOwed extends Component {
  state = {
    debtor: 'any',
    lender: 'any',
  }

  parseData = (data) => {
    let dataCpy = [...data];
    let res = [];
    for (let i = 0; i < dataCpy.length; i++) {
      let current = dataCpy[i];
      if (
        ((this.state.debtor !== 'any' && this.state.debtor !== current.debtor.id) ||
          (this.state.lender !== 'any' && this.state.lender !== current.lender.id))
      ) {
        continue;
      }
      let moneyOwedBack = dataCpy.find(m => m.lender.id === current.debtor.id && m.debtor.id === current.lender.id) || null;
      let giveAmount = (current.amount - moneyOwedBack.amount);
      if (giveAmount > 0)
        res.push({
          id: current.id,
          lender: current.lender,
          debtor: current.debtor,
          amount: Math.round(giveAmount * 100) / 100,
        });
    }
    return res;
  }

  displayMoneyOwed = () => {
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

  filterChanged = (filterState) => {
    this.setState({
      debtor: filterState.debtor,
      lender: filterState.lender,
    })
  }

  render = () => {
    return (
      <div className="display-money-owed">
        <MoneyOwedFilter stateChanged={this.filterChanged} />
        <List style={{ position: 'relative' }}>
          {this.displayMoneyOwed()}
        </List>
      </div>
    );
  }
}

export default graphql(getMoneyOwedQuery)(DisplayMoneyOwed);
