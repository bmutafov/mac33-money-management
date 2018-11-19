import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { getWeekExpenses } from '../queries/queries';
import { weekdaysBeforeToday, timestampToSimpleDate, sumPartialAmounts, getDateXDaysAgo, getFirstWeekDay } from '../helpers/helpers';
import { Bar } from 'react-chartjs-2';

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

class MonthlySpent extends Component {
  getExpenseAmounts = (obj, sinceDate) => {
    console.log('this.props :', this.props);
    let dateSpans = this.props.after;
    let result = [];
    for (let i = 0; i < dateSpans.length; i++) {
      let currWeek = obj.filter(e =>
        e.date > dateSpans[i].start.getTime() / 1000 &&
        e.date < dateSpans[i].end.getTime() / 1000
      );
      let amount = sumPartialAmounts(currWeek, 'amount');
      result.push(amount);
    }
    console.log('result :', result);
    return result;
  }

  getWeeklyData = () => {
    let { getWeekExpenses } = this.props;
    if (getWeekExpenses.loading) {
      return {}
    } else {
      let { expenses } = getWeekExpenses;
      let result = {
        labels: this.props.after.map(e => e.label),
        datasets: [
          {
            label: 'Monthly expenses',
            backgroundColor: 'rgb(255, 110, 48)',
            data: this.getExpenseAmounts(expenses)
          }
        ]
      };
      return result;
    }
  }

  render = () => {
    return (
      <div>
        <Bar data={this.getWeeklyData()} options={charOptions} ref='ca' width={600} height={300} redraw />
      </div>
    )
  }
}

export default graphql(getWeekExpenses, {
  name: 'getWeekExpenses',
  options: (props) => {
    console.log('props :', props);
    return {
      variables: {
        after: new String(new Date(props.after[0].start).getTime() / 1000),
      }
    }
  }
})(MonthlySpent);