/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

export function Coinlist({
  name,
  image,
  current_price,
  price_change_percentage_24h,
}) {
  current_price = numberWithCommas(current_price);
  return (
    <li>
      <div className="coin">
        <div className="coin-meta-data">
          <img src={image} alt="coin" />

          <span className="coin-name">{name}</span>
        </div>
        <p className="coin-price">${current_price}</p>
      </div>
    </li>
  );
}

Coinlist.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  current_price: PropTypes.number.isRequired,
  price_change_percentage_24h: PropTypes.number.isRequired,
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
