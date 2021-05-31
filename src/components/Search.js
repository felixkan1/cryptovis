/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Coinlist } from './Coinlist';

// //incorporate typing suggestion: https://webdevtrick.com/javascript-typing-suggestions/

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const coins = useSelector((state) => state.coins);
  const coinList = Object.values(coins);

  console.log('coins', coins);
  console.log('coinlist', coinList);

  return (
    <React.Fragment>
      <h1>Crypto-Vis</h1>
      <h3>Search for a cryptocurrency</h3>
      <div className="search-container">
        <div className="search-bar">
          <img
            src="https://img.icons8.com/android/24/000000/search.png"
            alt=""
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(evt) => setSearchTerm(evt.target.value)}
            id="searchTerm"
            placeholder="ie. Bitcoin"
            autoComplete="off"
          />
        </div>

        <ul className="coin-list">
          {coinList
            .filter((coin) => {
              return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((coin, index) => {
              return <Coinlist key={coin.id} id={coin.id} />;
            })}
        </ul>
      </div>
    </React.Fragment>
  );
}
