import moment from 'moment';

export function formatDate(time, format) {
  return moment(time).format(format || 'YYYY-MM-DD hh:mm:ss');
}