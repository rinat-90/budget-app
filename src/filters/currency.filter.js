export default function currencyFilter (value, currency = 'USD') {
  return new Intl.NumberFormat('us', {
    style: 'currency',
    currency
  }).format(value);
}
