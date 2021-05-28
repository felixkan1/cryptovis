import React from 'react';

export function Coinlist() {
  return (
    <ul className="coin-list">
      <li>
        <div className="coin">
          <div className="coin-meta-data">
            <img
              alt="dogecoin"
              src="https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png"
            />
            <span className="coin-name">Dogecoin</span>
          </div>
          <p className="coin-price">Price</p>
        </div>
      </li>
    </ul>
  );
}
