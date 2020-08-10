import moment from 'moment';

export function FormatNumber(value, prec) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: prec,
    minimumFractionDigits: prec,
  }).format(value);
}

export function FormatCurrency(value, coin = 'USD') {
  if (coin.toUpperCase() === 'BTC' || coin.toUpperCase() === 'ETH') {
    return FormatNumber(value, 4);
  }
  return FormatNumber(value, 2);
}

export function YesterdayToday(timestamp) {
  if (moment(timestamp).format('MMDDYYYY') === moment().format('MMDDYYYY')) {
    return 'Today';
  } else if (
    moment(timestamp).format('MMDDYYYY') ===
    moment().add(-1, 'day').format('MMDDYYYY')
  ) {
    return 'Yesterday';
  } else {
    return moment(timestamp).format('MMMM Do YYYY');
  }
}
