/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Coinlist } from './Coinlist';

// //incorporate typing suggestion: https://webdevtrick.com/javascript-typing-suggestions/

export function Search() {
  const coins = useSelector((state) => state.coins);
  const coinList = Object.values(coins);

  return (
    <div className="search-container">
      <div className="search-bar">
        <img src="https://img.icons8.com/android/24/000000/search.png" alt="" />
        <input
          type="text"
          id="searchTerm"
          placeholder="ie. dogecoin"
          autoComplete="off"
        />
      </div>
      <ul className="coin-list">
        {coinList.map((coin) => {
          const {
            name,
            symbol,
            image,
            current_price,
            price_change_percentage_24h,
          } = coin;
          return (
            <Coinlist
              name={name}
              symbol={symbol}
              image={image}
              current_price={current_price}
              price_change_percentage_24h={price_change_percentage_24h}
            />
          );
        })}
      </ul>
    </div>
  );
}
