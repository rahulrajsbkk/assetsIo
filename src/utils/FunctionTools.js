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
