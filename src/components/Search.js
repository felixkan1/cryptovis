import React from 'react';
import { Coinlist } from './Coinlist';

// //incorporate typing suggestion: https://webdevtrick.com/javascript-typing-suggestions/

export function Search() {
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
      <Coinlist />
    </div>
  );
}
