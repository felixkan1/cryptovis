/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Coinlist } from './Coinlist';


// //incorporate typing suggestion: https://webdevtrick.com/javascript-typing-suggestions/

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCoins, setVisibleCoins] = useState(15);
  const coins = useSelector((state) => state.coins);
  const coinList = Object.values(coins);

  const handleSearchTermChange = (evt) => {
    setSearchTerm(evt.target.value);
    if (evt.target.value.length === 0) {
      setVisibleCoins(15);
    } else {
      setVisibleCoins(Infinity);
    }
  };

  const handleLoadMore = () => {
    setVisibleCoins((prevVisibleCoins) => prevVisibleCoins + 15);
  };

  const LoadEnabled = () => {
    return searchTerm.length > 0 || visibleCoins >= 250;
  };

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
            onChange={handleSearchTermChange}
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
            .slice(0, visibleCoins)
            .map((coin, index) => {
              return <Coinlist key={coin.id} id={coin.id} />;
            })}
        </ul>
        <button
          className="load-more btn-clear"
          type="button"
          onClick={handleLoadMore}
          disabled={LoadEnabled()}
        >
          Load more
        </button>
      </div>
    </React.Fragment>
  );
}
