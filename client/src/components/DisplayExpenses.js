import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import colors from '../helpers/colors'

// Import queries
import { getExpensesQuery } from '../queries/queries';
import { timestampToDate } from '../helpers/helpers';
import InfoIcon from './InfoIcon';

class DisplayExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: !this.state.open });
  };


  displayExpenses() {
    let { data } = this.props;
    if (data.loading) {
      return (
        <div> loading expenses... </div>
      );
    } else {
      return data.expenses.map(expense => {
        return (
          <ListItem key={expense.id}>
            <ListItemIcon>
              <Avatar style={{ background: colors[expense.payer.color || 0].hex }}>{expense.payer.name.charAt(0)}</Avatar>
            </ListItemIcon>
            <ListItemText
              primary={`${expense.payer.name} paid ${expense.amount}€`}
              secondary={timestampToDate(expense.date)}
            />
            <InfoIcon title={expense.description} />
          </ListItem>
        )
      });
    }
  }

  render() {
    return (
      <div className="display-expenses">
        <Typography variant="h5" gutterBottom className="heading">
          Prvioues expenses
        </Typography>
        <List>
          {this.displayExpenses()}
        </List>
      </div>
    );
  }
}

export default graphql(getExpensesQuery)(DisplayExpenses);
