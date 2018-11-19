import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { getWeekExpenses } from '../queries/queries';
import { weekdaysBeforeToday, timestampToSimpleDate, sumPartialAmounts } from '../helpers/helpers';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

const charOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }]
  }
};

const getValidExpense = (amount, date) => {
  return {
    amount: amount,
    date: timestampToSimpleDate(date)
  }
}

class WeeklySpent extends Component {
  getExpenseAmounts = (obj, sinceDate) => {
    let currDate = new Date()
    let result = [];
    for (let i = 0; i < sinceDate; i++ , currDate.setDate(currDate.getDate() - 1)) {
      let dateExpenses = obj.filter(e => e.date === timestampToSimpleDate(currDate.getTime() / 1000));
      let amountSum = sumPartialAmounts(dateExpenses, 'amount');
      result.push(amountSum);
    }
    result.reverse();
    return result;
  }

  getWeeklyData = () => {
    let { getWeekExpenses } = this.props;
    if (getWeekExpenses.loading) {
      return {}
    } else {
      let { expenses } = getWeekExpenses;
      let mappedDates = expenses.map(ex => getValidExpense(ex.amount, ex.date));
      let result = {
        labels: weekdaysBeforeToday(),
        datasets: [
          {
            label: 'Weekly expenses',
            backgroundColor: 'rgba(255, 110, 48, 0.5)',
            borderColor: 'rgba(255, 110, 48, 1)',
            borderWidth: 1,
            data: this.getExpenseAmounts(mappedDates, 7)
          }
        ]
      };
      return result;
    }
  }

  render = () => {
    return (
      <Fragment>
        <Typography variant="display1" style={{ textAlign: 'center' }}>
          Weekly money spent
        </Typography>
        <Bar data={this.getWeeklyData()} options={charOptions} ref='ca' width={600} height={300} redraw />
      </Fragment>
    )
  }
}

export default graphql(getWeekExpenses, {
  name: 'getWeekExpenses',
  options: (props) => {
    return {
      variables: {
        after: props.after,
      }
    }
  }
})(WeeklySpent);