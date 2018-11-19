import React, { Fragment } from 'react'
import MonthlySpent from './MonthlySpent';
import WeeklySpent from './WeeklySpent';
import { getWeeks, getDateXDaysAgo } from '../helpers/helpers'

export default props =>
  <Fragment>
    <WeeklySpent after={getDateXDaysAgo(7)} />
    <MonthlySpent after={getWeeks()} />
  </Fragment>