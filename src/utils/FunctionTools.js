import moment from 'moment';

export function FormatNumber(value, prec) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: prec,
    minimumFractionDigits: prec,
  }).format(isNaN(value) ? 0 : value);
}

export function FormatCurrency(value, coin = 'USD') {
  if (coin.toUpperCase() === 'BTC' || coin.toUpperCase() === 'ETH') {
    return FormatNumber(value, 4);
  }
  return FormatNumber(value, 2);
}

export function YesterdayToday(timestamp, format = 'MMMM Do YYYY') {
  if (moment(timestamp).format('MMDDYYYY') === moment().format('MMDDYYYY')) {
    return 'Today';
  } else if (
    moment(timestamp).format('MMDDYYYY') ===
    moment().add(-1, 'day').format('MMDDYYYY')
  ) {
    return 'Yesterday';
  } else {
    return moment(timestamp).format(format);
  }
}
export function IsValidURL(str) {
  const urlRegex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return urlRegex.test(str) ? str : false;
}
