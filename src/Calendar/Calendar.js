import React, { Component } from 'react';
import moment from 'moment';
import cx from 'classnames';
import {
  getVisibleDays,
  isWeekday,
  getBackground,
} from './helper';

import './Calendar.css';

const daysOfWeek = moment.weekdaysShort();

export default class Calendar extends Component {
  state = {
    month: moment(),
    days: getVisibleDays(moment()),
  }

  render() {
    const {
      month,
    } = this.state;

    return (
      <div className="Calendar">
        <button onClick={this.previousMonth}>{"<"}</button>
        <div className="Calendar-container">
          <div className="Calendar-current-date">
            {month.format('MMMM YYYY')}
          </div>

          <div className="Calendar-weeks">
            {daysOfWeek.map((name, i) => <div key={i}>{name}</div>)}
          </div>
          <div className="Calendar-days">
            {this.renderDays(month)}
          </div>
        </div>
        <button onClick={this.nextMonth}>{">"}</button>
      </div>
    )
  }

  nextMonth = () => {
    this.goToMonth(1);
  }

  previousMonth = () => {
    this.goToMonth(-1);
  }

  goToMonth(next) {
    const month = moment(this.state.month).add(next, 'M');
    const days = getVisibleDays(month);

    this.setState({
      month,
      days,
    });
  }

  getColors(day) {
    const {
      drivers,
      trips,
      start,
    } = this.props;

    if (day >= start) {
      const diff = day.diff(start, 'days');
      const trip = trips[day.format('YYYY-MM-DD')];
      const driverOfWeek = Math.floor(diff / 7) % drivers.length;

      const colors = {
        day: drivers[driverOfWeek].colors[2],
        week: drivers[driverOfWeek].colors[2],
      }

      if (trip) {
        colors.day = drivers[trip.driverOfDay].colors[2]
      }

      return colors;
    }
  }

  renderDays(date) {
    return this.state.days.map((d) => {
      const colors = isWeekday(d.day.days()) && this.getColors(d.day);

      return (
        <Day
          key={d.day.format('DDD')}
          {...d}
          colors={colors}
          onClick={this.props.onClick}
        />
      );
    });
  }
}

const Day = ({ day, disabled, colors, onClick }) => {
  const className = cx('Day', {
    'is-disabled': disabled,
  });

  const props = {
    className,
    onClick: colors ? onClick.bind(null, day) : () => null,
    style: {
      background: getBackground(colors),
    }
  }
  return (
    <div {...props}>
      <span>{day.date()}</span>
    </div>
  );
}
