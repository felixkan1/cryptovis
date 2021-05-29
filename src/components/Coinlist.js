/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

export function Coinlist({ coin }) {
  const { name, image, id, price_change_percentage_24h } = coin;
  const current_price = numberWithCommas(coin.current_price);
  return (
    <Link to={`/currency/${id}`} className="coin">
      <div className="coin-info">
        <div>
          <img src={image} alt="coin" />
          <span className="coin-name">{name}</span>
        </div>
        <p className="coin-price">${current_price}</p>
      </div>
    </Link>
  );
}

Coinlist.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  current_price: PropTypes.number.isRequired,
  price_change_percentage_24h: PropTypes.number.isRequired,
};

//need to change this function to account for small decimals
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
