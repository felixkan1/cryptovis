/* eslint-disable */
export function getInitialData() {
  return fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'
  )
    .then((data) => data.json())
    .then((coins) => console.log(coins));
}
