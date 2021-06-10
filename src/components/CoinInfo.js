/* eslint-disable */
import React from 'react';

export function CoinInfo({ coinData, id }) {
  const {
    market_data: {
      market_cap,
      price_change_24h_in_currency,
      high_24h,
      low_24h,
      circulating_supply,
    },
    market_cap_rank,
  } = coinData;
  console.log(market_cap.usd);
  return (
    <div className="coin-stat">
      <h2>Coin Statistics</h2>
      <p>
        Market Cap Rank <b>#{market_cap_rank}</b>
      </p>
      <p>
        Market Cap <b>${numberWithCommas(market_cap.usd)}</b>
      </p>
      <p>
        Circulating Supply <b>{numberWithCommas(circulating_supply)}</b>
      </p>
      <p>
        Price Change 24h $
        <b>${numberWithCommas(price_change_24h_in_currency.usd.toFixed(2))}</b>
      </p>
      <p>
        24h High/24h Low{' '}
        <b>
          ${numberWithCommas(high_24h.usd)}/ <br /> $
          {numberWithCommas(low_24h.usd)}
        </b>
      </p>
    </div>
  );
}

function numberWithCommas(x) {
  if (x <= 1) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
