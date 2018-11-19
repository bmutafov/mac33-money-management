import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SubdirectoryArrowLeft from '@material-ui/icons/SubdirectoryArrowLeft';
import { Avatar } from '@material-ui/core';
import { getExpensesQuery } from '../queries/queries';
import { timestampToDate } from '../helpers/helpers';
import colors from '../helpers/colors';

const debt = props =>
  <div style={{ display: 'flex', marginTop: 10 }} key={props.debtor.id}>
    <SubdirectoryArrowLeft style={{ display: 'inline-block', transform: 'rotate(90deg)', marginLeft: 10 }} />
    <Avatar style={{ background: colors[props.debtor.color].hex, marginLeft: 15 }}>{props.debtor.name.charAt(0)}</Avatar>
    <Typography style={{ marginLeft: 15, lineHeight: '40px', verticalAlign: 'middle' }}>
      {props.debtor.name} <b>{props.amount}€</b>
    </Typography>
  </div>;

class ExpansionExpenses extends Component {

  displayExpenses = () => {
    let { getExpensesQuery } = this.props;
    if (getExpensesQuery.loading) {
      return (<div> loading.. </div>)
    } else {
      return getExpensesQuery.expenses.map(expense => {
        return (
          <ExpansionPanel key={expense.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Avatar style={{ background: colors[expense.payer.color].hex }}>{expense.payer.name.charAt(0)}</Avatar>
              <Typography style={{ verticalAlign: 'center', lineHeight: '40px', marginLeft: 15 }}>
                <b>{expense.payer.name}</b> paid <b>{expense.amount}€</b> on <i>{timestampToDate(expense.date)}</i>
              </Typography>
              <Typography style={{ verticalAlign: 'center', lineHeight: '40px', marginLeft: 15, float: 'right', color: '#999999' }}>
                <i>"{expense.description}"</i>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column' }}>

              {expense.debts.map(d => debt(d))}

            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      });
    }
  }

  render = () => {
    return (
      <div>
        {this.displayExpenses()}
      </div>
    )
  }
}

export default graphql(getExpensesQuery, { name: 'getExpensesQuery' })(ExpansionExpenses);