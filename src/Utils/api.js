/* eslint-disable */
export function getInitialData() {
  return fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'
  ).then((data) => data.json());
}
export function getHistoriacalData(id, days) {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  ).then((data) => data.json());
}
