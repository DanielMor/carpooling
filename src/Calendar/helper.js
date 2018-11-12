import moment from 'moment';

export function getVisibleDays(date) {
  let start = moment(date).startOf('month').day(0);
  let end = moment(date).endOf('month').day(6);
  let total = end.diff(start, 'days') + 1;

  return new Array(total)
    .fill(0)
    .map((_, index) => {
      const day = moment(start).add(index, 'd');
      const isDifferentMonth = date.month() !== day.month();

      return {
        disabled: isDifferentMonth,
        day,
      }
    });
}

export function isWeekday(d) {
  return d > 0 && d < 6;
}

export function getBackground(colors) {
  return colors && `linear-gradient(180deg, ${colors.week} 25%, ${colors.day} 25%`;
}
