/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { handleToggleWatch } from '../actions/watchList';

export function Coinlist({ id }) {
  const dispatch = useDispatch();
  const coinList = useSelector((state) => state.coins);
  const watchList = useSelector((state) => state.watchList);
  const {
    name,
    image,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
  } = coinList[id];
  const formattedPrice = numberWithCommas(current_price);

  const handleWatch = (evt, id) => {
    evt.preventDefault();
    dispatch(handleToggleWatch(id));
  };

  return (
    <Link to={`/currency/${id}`} className="coin">
      <div className="coin-info">
        <div>
          <button
            className={`star-button ${watchList.includes(id)}`}
            onClick={(evt) => handleWatch(evt, id)}
          >
            {watchList.includes(id) ? <AiFillStar /> : <AiOutlineStar />}
          </button>
          <span>{market_cap_rank}</span>
          <img src={image} alt="coin" />
          <span className="coin-name">{name}</span>
        </div>
        <p className="coin-price">${formattedPrice}</p>
      </div>
    </Link>
  );
}

Coinlist.propTypes = {
  id: PropTypes.string.isRequired,
};

//need to change this function to account for small decimals
function numberWithCommas(x) {
  if (x <= 1) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
